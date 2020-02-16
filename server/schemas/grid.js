
var mongoose;
mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  /**
  * 图标id
  **/
  id: String,
  /**
   * 宫格标题
   */
  title: String,

  /**
   * 图标路径
   */
  iconUrl: String
});
