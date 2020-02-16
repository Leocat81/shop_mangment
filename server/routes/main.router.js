/**
 *
 * @description: 前台 接口
 * @author: junyong.hong
 * @createTime: 2018/4/9
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
// 文章
var Article = require('../models/Article');
//轮播
var Swipe = require('../models/Swipe');
// 宫格
var Grid = require('../models/Grid');
mongoose.connect('mongodb://127.0.0.1:27017/test');

// 连接成功
mongoose.connection.on('connected', function () {
  console.log('MongoDB connected success.');
});

// 连接失败
mongoose.connection.on('error', function () {
  console.log('MongoDB connected fail.');
});

// 断开连接
mongoose.connection.on('disconnected', function () {
  console.log('MongoDB connected disconnected.');
});
/*================================== 添加用户首页轮播图 begin =======================================*/
router.post('/addSwipe', function (req, res, next) {
  let a= new Swipe({
    userId: req.body.userId,
    picUrl:req.body.picUrl
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
router.get('/getSwipe', function (req, res, next) {
  Swipe.find({userId: req.query.userId})
    .exec(function (err, doc) {
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
/*================================== 添加首页宫格 begin =======================================*/
router.post('/addGrid', function (req, res, next) {
  let params= new Grid({
    title: req.body.title,
    iconUrl:req.body.iconUrl
  });
  // 不存在，进行添加
  params.save(function (err2, doc2) {
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
router.get('/getGrid', function (req, res, next) {
  Grid.find()
    .exec(function (err, doc) {
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
/*================================== 获取文章信息 begin =======================================*/
/**
 * 前台获取所有文章，如果指定分类id就获取指定id下的文章
 */
router.post('/articleAll', function (req, res, next) {
  // 当前页数（如果没有参数 默认第一页）
  var currentPage = parseInt(req.body.currentPage || 1);
  // 每页显示条数（如果没参数 默认显示全部）
  var pageSize = parseInt(req.body.pageSize || '');
  // 总页数 默认为0
  var pageCount = 0;
  // 文章的状态
  var articleStatus = req.body.articleStatus;


  /**
   * 获取总条数
   *  count: 总条数
   */
  Article.find({
    articleStatus: articleStatus
  }).count(function (err, count) {
    // 计算总页数
    pageCount = Math.ceil(count / pageSize);
    // 取值不能超过pageCount（不能超过最大页数）
    currentPage = Math.min(currentPage, pageCount);
    // 取值不能小于1
    currentPage = Math.max(currentPage ,1);
    // 忽略条数
    var skip = (currentPage - 1) * pageSize;

    // 要查询的条件
    var params = {};
    // 分类的id
    var categoryId = req.body.categoryId || '';

    if (categoryId) {
      params.category = categoryId;
    }
    if (articleStatus == '0') {
      params.articleStatus = articleStatus
    }

    // 获取文章
    Article.find(params).skip(skip).limit(pageSize).sort({
      addTime: -1
    }).exec(function (err, doc) {
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
            // 总条数
            count: count,
            // 总页数
            pageCount: pageCount,
            // 每页显示条数
            pageSize: pageSize,
            // 当前页
            currentPage: currentPage,
            // 列表数据
            list: doc
          }
        })
      }
    })
  });
});

/**
 * 根据id，查看文章详情
 */
router.post('/artDetail', function (req, res, next) {
  var articleId = req.body.articleId;

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
      if (doc) {
        // 阅读数量加1
        doc.views++;
        doc.save();

        res.json({
          status: '0',
          msg: '',
          result: doc
        });
      }
    }
  })
});

/**
 * 获取最新文章（十篇）
 */
router.post('/articleNewTen', function (req, res, next) {
  var newTen = req.body.newTen || 10;
  var articleStatus = req.body.articleStatus;
  Article.find({
    articleStatus: articleStatus
  }).skip(0).limit(newTen).sort({
    addTime: -1
  }).exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      console.log(doc)
      res.json({
        status: '0',
        msg: '',
        result: doc
      })

    }
  })
});

/**
 * 上一篇文章
 */
router.post('/articlePrevious', function (req, res, next) {
  var articleId = req.body.articleId;
  // 上一篇
  Article.find({
    _id: { '$gt': articleId }
  }).sort({
    _id: 1
  }).find({
    // 0代表上架的文章
    articleStatus: 0
  }).limit(1).exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc.length != 0) {
        // console.log(doc)
        // if (doc.articleStatus != 0) {
        //
        // }

        res.json({
          status: '0',
          msg: '',
          result: doc
        })
      } else {
        res.json({
          status: '2',
          msg: '没有上一篇文章了~',
          result: ''
        })
      }
    }
  });
});

/**
 * 下一篇文章
 */
router.post('/articleNext', function (req, res, next) {
  var articleId = req.body.articleId;
  Article.find({
    _id: { '$lt': articleId }
  }).sort({
    _id: -1
  }).find({
    // 0代表上架的文章
    articleStatus: 0
  }).limit(1).exec(function (err, doc) {
    if (err) {
      res.json({
        status: '1',
        msg: err.message,
        result: ''
      })
    } else {
      if (doc.length != 0) {
        res.json({
          status: '0',
          msg: '',
          result: doc
        })
      } else {
        res.json({
          status: '2',
          msg: '没有下一篇文章了~',
          result: ''
        })
      }
    }
  });
});
/*================================== 获取文章信息 end =======================================*/

module.exports = router;
