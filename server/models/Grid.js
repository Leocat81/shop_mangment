/**
 *
 * @description: 宫格 首页宫格展示
 * @author: pipe
 * @createTime: 2018/4/9
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var mongoose = require('mongoose');

var gridSchema = require('../schemas/grid');

module.exports = mongoose.model('Grid', gridSchema);
