/**
 *
 * @description: 文章的表结构 数据库储存结构文件
 * @author: junyong.hong
 * @createTime: 2018/4/10
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var mongoose = require('mongoose');

module.exports = new mongoose.Schema({

  /**
   * 关联字段（内容分类的id）
   */
  category: {
    // 类型
    type: mongoose.Schema.Types.ObjectId,
    // 引用 models目录下的Category.js里的Category
    ref: 'Category'
  },

  /**
   * 标题
   */
  title: String,

  /**
   * 添加时间
   */
  addTime: String,

  /**
   * 简介
   */
  description: {
    type: String,
    default: ''
  },

  /**
   * 阅读量
   */
  views: {
    type: Number,
    default: 0
  },

  /**
   * 内容
   */
  content: {
    type: String,
    default: ''
  },

  /**
   * 文章状态
   *  0代表上架、1代表下架、2代表保存成草稿
   */
  articleStatus: {
    type: Number,
    default: 0
  }
});
