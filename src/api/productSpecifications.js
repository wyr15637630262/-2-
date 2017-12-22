/**
 * Created by user on 2017/5/2.
 */

module.exports = {
  options: [{
    value: '颜色',
    label: '颜色',
    show: false,
    child: [{value: '白色', label: '白色'}, {value: '红色', label: '红色'}, {value: '黑色', label: '黑色'}, {value: '蓝色', label: '蓝色'}, {value: '棕色', label: '棕色'}]
  }, {
    value: '尺寸',
    label: '尺寸',
    show: false,
    child: [ {value: '20', label: '20'}, {value: '30', label: '30'}, {value: '50', label: '50'} ]
  }, {
    value: '尺码11',
    label: '尺码11',
    show: false,
    child: [ {value: 'S', label: 'S'}, {value: 'M', label: 'M'}, {value: 'L', label: 'L'} ]
  }, {
    value: '规格11',
    label: '规格11'
  }, {
    value: '款式22',
    label: '款式22'
  }, {
    value: '金重',
    label: '金重'
  }, {
    value: '套餐',
    label: '套餐'
  }]
}
