<!--
  - commodityBank Vue 文件
  - @JsName commodityBank
  - @Description
  - @DateTime 2017/12/19 11:34
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="商品管理" mTitle2="商品库"></m-Breadcrumb>
    <div class="commodityBank_content">

    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'commodityBank',
    data () {
      return {}
    },
    methods: {},
    mounted () {},
    components: {
      mBreadcrumb
    }
  }
</script>
<!-- 引入 commodityBank Scss 文件  -->
<style lang="scss" scoped>@import "scss/commodityBank";</style>
