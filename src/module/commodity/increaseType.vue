<!--
  - increaseType Vue 文件
  - @JsName increaseType
  - @Description
  - @DateTime 2017/12/22 17:37
  - @author 亚茹
  -->
<template>
    <div>
      <m-Breadcrumb mTitle1="商品管理" mTitle2="添加类别"></m-Breadcrumb>
      <div class="increaseType_content">

      </div>
    </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'increaseType',
    data () {
      return {
        typeParams: {isRecycled: 1, page: 1, size: 10}, // 商品类别参数
        recycleTypeParams: {isRecycled: 0, page: 1, size: 10}, // 回收站商品类别参数
        typeList: [], // 商品类别列表
        typeListTotal: 10, // 商品类别总个数
        typeListPageSize: 10, // 每页个数
        pageNumber: '',
        imgShow: false, // 回收站标识
        adds: false, // 新增标识
        edit: false, // 编辑标识
        labelName: '', // 编辑(标签名)
        sortPriority: '', // 编辑(标签排序)
        msg1: '编辑',
        msg2: '删除'
      }
    },
    methods: {},
    mounted () {},
    components: {
      mBreadcrumb
    }
  }
</script>
<!-- 引入 increaseType Scss 文件  -->
<style lang="scss" scoped>@import "scss/increaseType";</style>
