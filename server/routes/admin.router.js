/**
 *
 * @description: 管理员 接口
 * @author: junyong.hong
 * @createTime: 2018/4/9
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
// 管理员
var Admin = require('../models/Admin')
// 文章分类
var Category = require('../models/Category')
// 文章
var Article = require('../models/Article')
// 日期格式化
require('../util/date')
// MarkDown
var MarkDown = require('markdown').markdown

mongoose.connect('mongodb://127.0.0.1:27017/test')

// 连接成功
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.')
})

// 连接失败
mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.')
})

// 断开连接
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.')
})

/*================================== 登录、校验登录、退出 begin ======================================= */

/**
 * 管理员登录
 */
router.post('/login', function (req, res, next) {
  // 查询的参数
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  Admin.findOne(param, function (err, doc) {
    // 请求错误
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: err
      })
    } else {
      // 请求正确
      if (doc) {
        // 用户信息存到cookie中
        res.cookie('userId', doc.userId, {
          // 放到服务器的根目录
          path: '/',
          // 保存一个小时
          maxAge: 1000 * 600 * 2
        })
        res.cookie('userName', doc.userName, {
          // 放到服务器的根目录
          path: '/',
          // 保存一个小时
          maxAge: 1000 * 600 * 2
        })

        res.json({
          status: '0',
          msg: '',
          result: {
            userName: doc.userName,
            realName: doc.realName,
            userId: doc.id
          }
        })
      } else {
        res.json({
          status: '2',
          msg: '帐号或密码错误~',
          result: ''
        })
      }
    }
  })
})

/**
 * 校验登录
 */
router.get('/checkLogin', function (req, res, next) {
  // cookie存在
  if (req.cookies.userId) {
    res.json({
      status: '0',
      msg: '',
      result: req.cookies.userId || ''
    })
  } else {
    res.json({
      status: '1',
      msg: '未登录',
      result: ''
    })
  }
})
router.post('/addAdmin', function (req, res, next) {
  let a= new Admin({
    userName: req.body.userName,
    userPwd:req.body.userPwd
  });
  // 不存在，进行添加
  a.save(function (err2, doc2) {
    if (err2) {
      res.json({
        status: '1',
        msg: err2.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '添加成功~',
        result: ''
      })
    }
  })
})

/**
 * 退出
 */
router.post('/logout', function (req, res, next) {
  // 删除cookie
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  })
  res.cookie('realName', '', {
    path: '/',
    maxAge: -1
  })
  res.cookie('userName', '', {
    path: '/',
    maxAge: -1
  })
  res.json({
    status: '0',
    msg: '',
    result: ''
  })
})

/*================================== 登录、校验登录、退出 end ======================================= */

/*================================== 分类 begin ======================================= */
/**
 * 获取所有分类
 */
router.get('/categoryList', function (req, res, next) {
  Category.find().sort({
    // 排序 1为升序 -1为降序
    _id: 1
  }).exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          list: doc
        }
      })
    }
  })
})

/**
 * 添加分类
 */
router.post('/categoryAdd', function (req, res, next) {
  // 分类名称
  var name = req.body.name || ''

  if (name == '') {
    res.json({
      status: '3',
      msg: '分类名称不能为空~',
      result: ''
    })
    return
  }

  // 判断要添加的分类是否已经存在
  Category.findOne({
    name: name
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      // 分类已经存在了
      if (doc) {
        res.json({
          status: '2',
          msg: '分类已经存在了~',
          result: ''
        })
      } else {
        let a=        new Category({
          name: name
        });
        // 不存在，进行添加
        a.save(function (err2, doc2) {
          if (err) {
            res.json({
              status: '1',
              msg: err2.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '添加成功~',
              result: ''
            })
          }
        })
      }
    }
  })
})

/**
 * 删除分类
 */
router.post('/categoryDel', function (req, res, next) {
  // 分类id
  var categoryId = req.body.categoryId

  if (categoryId == '') {
    res.json({
      status: '3',
      msg: '分类id不能为空~',
      result: ''
    })
    return
  }

  // 判断分类下是否存在文章
  Category.findOne({
    _id: categoryId
  }, function (err, doc) {
    // 出错
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      // 分类下没有文章
      if (doc.count === 0) {
        // 删除分类
        Category.remove({
          _id: categoryId
        }, function (err2) {
          if (err2) {
            res.json({
              status: '1',
              msg: err2.message,
              result: ''
            })
          } else {
            res.json({
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      } else {
        res.json({
          status: '2',
          msg: '该分类下有文章，不能删除~',
          result: ''
        })
      }
    }
  })
})

/**
 * 获取要修改分类名称：根据id，查找分类的名称
 */
router.post('/categoryFindOne', function (req, res, next) {
  var categoryId = req.body.categoryId || ''

  if (categoryId == '') {
    res.json({
      status: '2',
      msg: '分类id不能为空~',
      result: ''
    })
    return
  }

  Category.findOne({
    _id: categoryId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
})

/**
 * 修改分类 -- 保存
 */
router.post('/categoryEdit', function (req, res, next) {
  // 分类id
  var categoryId = req.body.categoryId || ''
  // 分类名称
  var categoryName = req.body.categoryName || ''

  if (categoryName == '') {
    res.json({
      status: '5',
      msg: '分类名称不能为空~',
      result: ''
    })
    return
  }

  // 根据分类id，判断该分类是否存在
  Category.findOne({
    _id: categoryId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (!doc) {
        res.json({
          status: '2',
          msg: '分类信息不存在~',
          result: ''
        })
      } else {
        // 当用户没有做任何修改提交的时候
        if (categoryName === doc.name) {
          res.json({
            status: '3',
            msg: '用户没有修改~',
            result: ''
          })
        } else {
          // 要修改的分类名称是否已经在数据库中存在
          Category.findOne({
            _id: {$ne: categoryId}, // id不等于当前的id
            name: categoryName
          }, function (err, doc) {
            if (doc) {
              res.json({
                status: '4',
                msg: '数据库中已经存在同名的分类~',
                result: ''
              })
            } else {
              // 进行修改
              Category.update({
                _id: categoryId
              }, {
                name: categoryName
              }, function (err, doc) {
                res.json({
                  status: '0',
                  msg: '修改成功~',
                  result: ''
                })
              })
            }
          })
        }
      }
    }
  })
})

/**
 * 修改分类数量
 */
router.post('/categoryNumber', function (req, res, next) {
  // 分类的id
  var categoryId = req.body.categoryId || ''
  // 判断是数量加1 还是 减1
  var categoryFlag = req.body.categoryFlag

  Category.findOne({
    _id: categoryId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      var count

      // 对分类下的文章进行修改
      if (categoryFlag == 'add') { // 数量加1
        count = parseInt(doc.count + 1)
      } else if (categoryFlag == 'remove') { // 数量减1
        count = parseInt(doc.count - 1)
      }

      // 修改数量
      Category.update({
        _id: categoryId
      }, {
        count: count
      }, function (err2, doc2) {
        if (err2) {
          res.json({
            status: '1',
            msg: err2.message,
            result: ''
          })
        } else {
          res.json({
            status: '0',
            msg: '',
            result: doc
          })
        }
      })
    }
  })
})
/*================================== 分类 end ======================================= */

/*================================== 文章 begin ======================================= */
/**
 * 添加文章
 */
router.post('/articleAdd', function (req, res, next) {
  new Article({
    category: req.body.category,
    title: req.body.title,
    // content: MarkDown.toHTML(req.body.content),
    description: req.body.description,
    content: req.body.content,
    addTime: new Date().Format('yyyy-MM-dd hh:mm:ss'),
    articleStatus: req.body.articleStatus
  }).save(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '添加成功~',
        result: ''
      })
    }
  })
})

/**
 * 获取所有文章
 */
router.get('/articleList', function (req, res, next) {
  // populate关联对象
  // populate('category'):category对应的是schemas/content.js里的category对象
  Article.find().sort({_id: -1}).populate(['category']).exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          list: doc
        }
      })
    }
  })
})

/**
 * 删除文章
 */
router.post('/articleDel', function (req, res, next) {
  var articleId = req.body.articleId

  Article.remove({
    _id: articleId
  }, function (err) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: ''
      })
    }
  })
})

/**
 * 通过文章id，查找对应的文章内容
 */
router.post('/articleFindOne', function (req, res, next) {
  var articleId = req.body.articleId

  Article.findOne({
    _id: articleId
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: doc
      })
    }
  })
})

/**
 * 修改文章
 */
router.post('/articleEdit', function (req, res, next) {
  var articleId = req.body.articleId
  var title = req.body.title
  var description = req.body.description
  var content = req.body.content
  var categoryId = req.body.categoryId
  var articleStatus = req.body.articleStatus

  Article.update({
    _id: articleId
  }, {
    title: title,
    description: description,
    content: content,
    category: categoryId,
    articleStatus: articleStatus
  }, function (err, doc) {
    res.json({
      status: '0',
      msg: '修改成功',
      result: ''
    })
  })
})

/**
 * 修改文章状态
 */
router.post('/articleArticleStatus', function (req, res, next) {
  var articleId = req.body.articleId
  var articleStatus = req.body.articleStatus
  Article.update({
    _id: articleId
  }, {
    articleStatus: articleStatus
  }, function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      res.json({
        status: '0',
        msg: '修改成功~',
        result: ''
      })
    }
  })
})
/*================================== 文章 end ======================================= */

module.exports = router
