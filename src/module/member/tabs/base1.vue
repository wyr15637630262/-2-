<!--
  - base1 Vue 文件
  - @JsName base1
  - @Description
  - @DateTime 2017/12/7 10:44
  - @author 亚茹
  -->
<template>
    <div class="base">
      <div class="baseMain">
        <div class="baseMain_top">
          <div class="baseTop">
            <div class="baseTop_img"><img src="./../../../../static/images/headerLogo.jpg" alt=""></div>
            <div class="baseTop_name">
              <h5><a>会员昵称：</a><span>小明</span></h5>
              <p><a>手机号码：</a><span>13419978801</span></p>
              <p><a>性别：</a><span>男</span></p>
              <p><a>生日：</a><span>1995-08-01</span></p>
              <p><a>积分：</a><span>202</span></p>
            </div>
            <div class="baseTop_date">
              <p><a>登录账号：</a><span>2222222222</span></p>
              <p><a>邀请人：</a><span>小华</span></p>
              <p><a>注册时间：</a><span>2015-01-12</span></p>
            </div>
          </div>
        </div>

        <div class="baseMain_center"></div>

        <div class="baseMain_bottom"></div>
      </div>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
  .base{
    width: 100%;
    height: 800px;
    .baseMain{
      width: 98%;
      height: 630px;
      margin: 25px auto;
      .baseMain_top{
        border:1px solid #dddddd;
        height: 263px;
        width: 100%;
        .baseTop{
          width: 582px;
          display: flex;
          .baseTop_img{
            width: 192px;
            background: palegoldenrod;
            img{
              width: 90px;
              height: 90px;
              display: block;
              border-radius: 50px;
              margin: 25px auto;
            }
          }
          .baseTop_name{
            width: 380px;
            background: palevioletred;
          }
          .baseTop_date{
            width: 185px;
            background: paleturquoise;
          }
        }
      }
      .baseMain_center{
        border:1px solid #dddddd;
        height: 133px;
        width: 100%;
        margin-top: 15px;
      }
      .baseMain_bottom{
        border:1px solid #dddddd;
        height: 190px;
        width: 100%;
        margin-top: 20px;
      }
    }
  }
</style>

