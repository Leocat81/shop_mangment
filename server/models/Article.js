/**
 *
 * @description: 模型 用于对文章表结构的操作
 * @author: junyong.hong
 * @createTime: 2018/4/10
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var mongoose = require('mongoose');

var articleSchema = require('../schemas/articles');

module.exports = mongoose.model('Article', articleSchema);
