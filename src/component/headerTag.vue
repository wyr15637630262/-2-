<!--
  - headerTag Vue 文件
  - @JsName headerTag
  - @Description
  - @DateTime 2017/12/5 11:45
  - @author 亚茹
  -->
<template>
    <div class="headerTag">
      <el-breadcrumb separator="-">
        <el-breadcrumb-item>{{mTitle1}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{mTitle2}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script>
  export default {
    props: ['mTitle1', 'mTitle2'],
    data: function () {
      return {
      }
    }
  }
</script>
<!-- 引入 headerTag Scss 文件  -->
<style lang="scss">
    .headerTag{
      width: 98%;
      background: #ffffff;
      margin: 10px auto;
      height: 58px;
      .el-breadcrumb{
        width: 98%;
        margin: 0 auto;
        height: 58px;
        line-height: 58px;
        font-size: 16px;
        .el-breadcrumb__item{
          &:nth-of-type(1){
            .el-breadcrumb__inner{
              color: #626363;
            }
          }
          &:nth-of-type(2){
            .el-breadcrumb__inner{
              color: #ec6a47;
            }
          }
        }
      }
    }
</style>
