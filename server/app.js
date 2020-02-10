var express = require('express');
// path路径
var path = require('path');
// 浏览器上面显示的logo
var favicon = require('serve-favicon');
// 日志输出
var logger = require('morgan');
// cookie转换
var cookieParser = require('cookie-parser');
// 返回值进行转换
var bodyParser = require('body-parser');
var ejs = require('ejs');

// 加载路由
// 前台路由
var main_router = require('./routes/main.router');
// 管理员路由
var admin_router = require('./routes/admin.router');

var app = express();

// 设置引擎
// 视图指向server/views下的文件
app.set('views', path.join(__dirname, 'views'));
// 设置引擎的后缀
app.engine('.html', ejs.__express);
// 设置引擎是html
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
// 转成json
app.use(bodyParser.json());
// 对cookie进行编码
app.use(bodyParser.urlencoded({ extended: false }));
// 使用cookie插件
app.use(cookieParser());
// 可以访问的静态资源（被外部直接访问）
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// 全局的拦截
app.use(function (req, res, next) {
  // 判断cookie是否存在 登录了
  // console.log('userid:' + req.cookies.userId);
  if (req.cookies.userId) {
    next();
  } else {
    console.log('url=' + req.originalUrl);

    // 白名单：让管理员可以发送登录、退出、请求分类
    if (
      true
        // // 登录
        // req.originalUrl == '/admin/login' ||
        // // 退出
        // req.originalUrl == '/admin/logout' ||
        // // 分类
        // req.originalUrl == '/admin/categoryList' ||
        // // 文章
        // req.originalUrl == '/index/articleAll' ||
        // // 文章详情
        // req.originalUrl == '/index/artDetail' ||
        // // 热门文章
        // req.originalUrl == '/index/articleNewTen' ||
        // // 上一篇文章
        // req.originalUrl == '/index/articlePrevious' ||
        // // 下一篇文章
        // req.originalUrl == '/index/articleNext'
    ) {
      next();
    } else {
      res.json({
        status: '10001',
        msg: '当前未登录',
        result: ''
      });
    }
  }
});

// 当访问/ 就是访问index（这里是服务端接口需要添加的前缀）
app.use('/index', main_router);
app.use('/admin', admin_router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(err);
});

module.exports = app;
