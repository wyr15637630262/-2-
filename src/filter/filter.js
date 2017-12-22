/**
 * filter Js 文件
 * @JsName filter
 * @Description Vue 自定义过滤器
 * @DateTime 2017-10-18 11:33
 * @author 花花
 */
import Moment from 'moment'
/**
 * 时间格式化
 * @param value 格式化的时间戳
 * @param format 格式化的格式
 * @returns 格式化后的时间
 */
export const date = (value, format) => {
  format = !format ? 'YYYY-MM-DD HH:mm:ss' : format
  return (!value || new Date(value).toString().match(/(Invalid Date)/)) ? value : Moment(value).format(format)
}
export default { date }
