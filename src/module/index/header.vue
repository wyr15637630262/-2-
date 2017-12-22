<!--
  - index Vue 文件
  - @JsName index
  - @Description 首页视图
  - @DateTime 2017-10-17 12:00
  - @author 亚茹
  -->
<template>
  <div class="common_header">
  	<div class="header_logo">
      <img src="./../../../static/images/logo.png" alt="">
    </div>
    <div class="header_msg">
      <div class="headerMsg_left">
        <h3>电商后台管理平台</h3>
      </div>
      <div class="headerMsg_right">
        <a @click="$router.push({name:'logIn'})">[退出]</a>
        <span>王明明</span>
        <img src="./../../../static/images/headerLogo.jpg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
	export default {
  name: 'header',
  data () {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
  .common_header{
    height: 60px;
    .header_logo{
      width: 217px;
      height: 100%;
      background-color: #ec6a47;
      float: left;
      img{
        width: 50px;
        height: 50px;
      }
    }
    .header_msg{
      height: 100%;
      background-color: #ffffff;
      margin-left: 217px;
      .headerMsg_left{
        float: left;
        width: 200px;
        height: 100%;
        h3{
          margin: 0 0 0 20px;
          font-size: 22px;
          height: 60px;
          line-height: 60px;
        }
      }
      .headerMsg_right{
        margin-left: 200px;
        height: 100%;
        text-align: right;
        line-height: 60px;
        font-size: 16px;
        span{
          padding: 0 15px;
        }
        img{
          width: 40px;
          height: 40px;
          border-radius: 50px;
          vertical-align: middle;
          margin-right: 2%;
        }
      }
    }
  }
</style>
