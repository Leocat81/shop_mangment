/**
 * 从数据库中创建和检索所有文档都由这些模型处理
 *
 * @description: 模型 用于对文章分类表结构的操作
 * @author: junyong.hong
 * @createTime: 2018/4/10
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var mongoose = require('mongoose');

var categorySchema = require('../schemas/category');

module.exports = mongoose.model('Category', categorySchema);
