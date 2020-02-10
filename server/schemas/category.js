/**
 *
 * @description: 文章分类的表结构 数据库储存结构文件
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
   * 分类名称
   */
  name: String,

  /**
   * 分类数量
   */
  count:  {
    type: Number,
    default: 0
  }

});
