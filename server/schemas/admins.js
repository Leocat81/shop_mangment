/**
 *
 * @description: 管理员的表结构 数据库储存结构文件
 * @author: junyong.hong
 * @createTime: 2018/4/10
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
var mongoose;
mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  /**
   * 用户id
   */
  userId: String,

  /**
   * 用户帐号
   */
  username: String,

  /**
   * 用户密码
   */
  password: String,

  /**
   * 用户真实姓名
   */
  realName: String

});
