
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
  picUrl: String
});
