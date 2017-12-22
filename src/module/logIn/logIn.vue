<!--
  - logIn Vue 文件
  - @JsName logIn
  - @Description 登录视图
  - @DateTime 2017-10-17 12:00
  - @author 亚茹
  -->
<template>
  <div class="logIn">
    <div class="login_head">
      <h2>后台管理系统</h2>
      <div class="login_filed">
        <p>管理后台</p>
        <div class="login_userName">
          <img src="../../../static/images/账号@2x.png">
          <input type="text" placeholder="请输入账号" ref="username" v-bind:disabled="isSubmit" v-model="logInForm.username">
        </div>
        <div class="login_userPsd">
          <img src="../../../static/images/密码@2x.png">
          <input type="password" placeholder="请输入密码" ref="password" v-bind:disabled="isSubmit" v-model="logInForm.password">
        </div>
        <button class="login_userBtn" @click="submitForm" v-bind:disabled="isSubmit" v-bind:loading="isSubmit">{{buttonName}}</button>
      </div>
    </div>
    <div class="login_body">
      <img src="../../../static/images/login_pic.png" alt="">
    </div>
  </div>
</template>
<!-- 引入 lonIn Js 文件  -->
<script src="./logIn.js"></script>
<!-- 引入 lonIn Scss 文件  -->
<style lang="scss" scoped>@import "logIn";</style>
