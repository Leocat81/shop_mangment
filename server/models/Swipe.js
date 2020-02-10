/**
 *
 * @description: 轮播 用于对首页轮播操作
 * @author: junyong.hong
 * @createTime: 2018/4/9
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var mongoose = require('mongoose');

var swipeSchema = require('../schemas/swipe');

module.exports = mongoose.model('Swipe', swipeSchema);
