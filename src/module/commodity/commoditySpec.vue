<!--
  - commoditySpec Vue 文件
  - @JsName commoditySpec
  - @Description
  - @DateTime 2017/12/11 16:31
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="商品管理" mTitle2="商品规格"></m-Breadcrumb>
    <div class="commoditySpec_content">

    </div>
  </div>
</template>

<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'commoditySpec',
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
    },
    components: {
      mBreadcrumb
    },
    computed: {
    }
  }
</script>
<!-- 引入 commodityVariety Scss 文件  -->
<style lang="scss" scoped>@import "scss/commoditySpec";</style>
