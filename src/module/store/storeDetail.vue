<!--
  - storeDetail.vue Vue 文件
  - @JsName storeDetail.vue
  - @Description
  - @DateTime 2017/12/6 15:41
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="店铺管理" mTitle2="店铺详情"></m-Breadcrumb>
    <div class="storeDetail_content">
      店铺详情
    </div>
  </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'storeDetail',
    data () {
      return {
      }
    },
    methods: {
    },
    mounted () {
      console.log(this.$route.params.userId)
    },
    components: {
      mBreadcrumb
    }
  }
</script>
<!--引入样式-->
<style lang="scss" scoped>@import "scss/storeDetail";</style>
