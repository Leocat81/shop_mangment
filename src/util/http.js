/**
 *
 * @description: 对axios进行封装
 * @author: junyong.hong
 * @createTime: 2018/5/23
 * @version: 1.0.0.0
 * @history:
 *    1、
 *    2、
 *
 */
import axios from 'axios'

// 添加请求路径前缀
axios.defaults.baseURL = '/'

const http = {
  /**
   * get请求方法
   * 调用：
   *  var params = { id: id }
   *  this.$get('url', params).then((response) => {  })
   * @param url 地址
   * @param params 参数
   * @returns {Promise}
   */
  get: function (url, params = {}) {
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      })
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  /**
   * post请求方法
   * 调用：
   *  var data = { id: id }
   *  this.$post('url', data).then((response) => {  })
   * @param url 地址
   * @param data 参数
   * @returns {Promise}
   */
  post: function (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.post(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  },
  /**
   * put请求方法
   * 调用：
   *
   *  this.$put(url, data).then((response) => {  })
   * @param url 地址
   * @param data 参数
   * @returns {Promise}
   */
  put: function (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.put(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  },
  /**
   * delete请求方法
   * @param url 地址
   * @param data 参数
   * @returns {Promise}
   */
  delete: function (url, data = {}) {
    return new Promise((resolve, reject) => {
      axios.delete(url, data)
        .then(response => {
          resolve(response.data)
        }, err => {
          reject(err)
        })
    })
  }
}

export default http
