/**
 * http Js 文件
 * @JsName http
 * @Description http 服务
 * @DateTime 2017-10-18 10:41
 * @author 花花
 */
import axios from './axios'
/**
 * 创建一个 Promise 请求函数
 * @param params 请求参数
 * @returns {Promise}
 */
export default (params) => {
  return new Promise((resolve, reject) => {
    axios({
      method: params.method,
      url: params.url,
      params: params.params,
      data: params.data
    }).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      reject(error)
    })
  })
}
