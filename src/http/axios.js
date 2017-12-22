/**
 * axios Js 文件
 * @JsName axios
 * @Description axios 服务配置
 * @DateTime 2017-10-17 17:51
 * @author 花花
 */
import axios from 'axios'
/**
 * 指定请求超时的毫秒数, 如果请求比 timeout 长, 请求将被中止
 */
axios.defaults.timeout = 5000
/**
 * 指定 baseURL, baseURL 将被添加到 url，除非 url 是绝对的, baseURL不会添加
 */
axios.defaults.baseURL = 'http://10.0.0.17:8888'
/**
 * 注册一个 http Request 拦截器
 */
axios.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
/**
 * 注册一个 http Response 拦截器
 */
axios.interceptors.response.use(
  (response) => {
    return response
  },
  (err) => {
    return Promise.reject(err)
  }
)
export default axios
