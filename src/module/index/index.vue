<!--
  - index Vue 文件
  - @JsName index
  - @Description 首页视图
  - @DateTime 2017-10-17 12:00
  - @author 花花
  -->
<template>
  <div class="index">
    <!--首页头部-->
  	<div class="index_header">
  		<v-Header></v-Header>
    </div>
    <!--首页内容-->
    <div class="index_body">
      <div class="wrap">
        <!--首页菜单-->
        <div class="indexBody_left">
          <v-side></v-side>
        </div>
        <!--首页菜单对应内容-->
        <div class="indexBody_right">
          <div class="right-in">
          <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vHeader from './header.vue'
import vSide from './side.vue'
export default {
  name: 'index',
  data () {
    return {
    }
  },
  components: {vHeader, vSide},
  methods: {
  },
  mounted () {
  }
}
</script>
<!-- 引入 index Scss 文件  -->
<style lang="scss" scoped>@import "index";</style>
