
<template>
  <div>
    <m-Breadcrumb mTitle1="会员管理" mTitle2="会员详情"></m-Breadcrumb>
    <div class="memberDetail_content">
      <div class="tab">
        <ul>
          <li v-for="(tab,index) in tabs" @click="toggle(index ,tab.view)" :class="{active:active==index}">{{tab.type}}</li>
        </ul>
        <div class="tabs_right"></div>
      </div>
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  import base1 from './tabs/base1.vue'
  import base2 from './tabs/base2.vue'
  import base3 from './tabs/base3.vue'
  import base5 from './tabs/base5.vue'
  import base6 from './tabs/base6.vue'
  import base4 from './tabs/base4.vue'
  export default {
    name: 'memberDetail',
    data () {
      return {
        active: 0,
        currentView: 'base1',
        tabs: [
          {
            type: '基本信息',
            view: 'base1'
          },
          {
            type: '卡券信息',
            view: 'base2'
          },
          {
            type: '会员权益',
            view: 'base3'
          },
          {
            type: '积分记录',
            view: 'base4'
          },
          {
            type: '收货地址',
            view: 'base5'
          },
          {
            type: '历史订单',
            view: 'base6'
          }
        ]
      }
    },
    methods: {
      toggle: function (i, v) {
        this.active = i
        this.currentView = v
      }
    },
    mounted () {
      console.log(this.$route.params.userId)
    },
    components: {
      mBreadcrumb, base1, base2, base3, base4, base5, base6
    }
  }
</script>
<style lang="scss" scoped>@import "scss/memberDetail";</style>
