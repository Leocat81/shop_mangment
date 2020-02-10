/**
 *
 * @description: 模型 用于对管理员表结构的操作
 * @author: junyong.hong
 * @createTime: 2018/4/9
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var mongoose = require('mongoose');

var adminSchema = require('../schemas/admins');

module.exports = mongoose.model('Admin', adminSchema);
