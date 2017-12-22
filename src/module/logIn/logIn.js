/**
 * logIn Js 文件
 * @JsName logIn
 * @Description 登录视图Js脚本
 * @DateTime 2017-10-17 12:06
 * @author 亚茹
 */
export default {
  name: 'logIn',
  data () {
    return {
      isSubmit: false,
      buttonName: '登录',
      logInForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    showMessage (type, duration, message, callback) {
      this.$message({
        type: type,
        duration: duration,
        showClose: false,
        message: message,
        onClose: (el) => {
          if (callback) callback(el)
        }
      })
    },
    validator () {
      var that = this
      if (that.logInForm.username === '' || that.logInForm.username === undefined) {
        that.showMessage('info', 2000, '请输入用户名'); return false
      } else if (that.logInForm.password === '' || that.logInForm.password === undefined) {
        that.showMessage('info', 2000, '请输入密码'); return false
      } else {
        return true
      }
    },
    submitForm: function () {
      var that = this
      if (that.validator()) {
        that.buttonName = '登录中'
        that.isSubmit = true
        // API.logIn(that.logInForm).then((res) => {
        //   if (res.code === 10011) {
        //     that.showMessage('success', 1000, res.result, () => {
        //       that.$router.push('/backend')
        //     })
        //   } else {
        //     that.showMessage('warning', 1500, res.result, () => {
        //       that.buttonName = '登录'; that.isSubmit = false
        //     })
        //   }
        // }, (err) => {
        //   console.log(err)
        // })
      }
      // this.$router.push({name: 'index'})
    }
  },
  mounted () {
  }
}
