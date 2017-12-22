<template>
  <div>
    <m-Breadcrumb mTitle1="会员管理" mTitle2="会员列表"></m-Breadcrumb>
    <div class="memberList_content">
      <div class="query_criteria">
        <div class="query_name"><label>姓名</label><input type="text"></div>
        <div class="query_date"><label>时间</label><input type="text"></div>
        <div class="query_ensure"><input type="button" value="查询"></div>
      </div>
      <table class="memberList_table">
        <thead>
        <tr>
          <td style="width: 10%">编号</td>
          <td style="width: 13%">用户姓名</td>
          <td style="width: 18%">联系方式</td>
          <td style="width: 18%">微信账号</td>
          <td style="width: 18%">注册时间</td>
          <td style="width: 13%">订单数量</td>
          <td style="width: 10%">操作</td>
        </tr>
        </thead>
        <tbody v-if="memberList.length!==0">
        <tr v-for="(item,index) in memberList">
          <td>00{{index+1}}</td>
          <td>{{item.memberNickName}}</td>
          <td>{{item.memberTel}}</td>
          <td>xiaoming08383</td>
          <td>{{item.registeredTime|date('YYYY-MM-DD')}}</td>
          <td>30</td>
          <td><a>删除</a><a style="padding: 0 10px">|</a><a @click="$router.push({name:'memberDetail',params:{userId: 123}})">详情</a></td>
        </tr>
        </tbody>
        <tbody v-else-if="memberList.length===0">
        <tr>
          <td colspan="7" >暂无数据...</td>
        </tr>
        </tbody>
      </table>
      <div class="memberList_page" v-if="memberList.length!==0">
        <div class="pages">
          <el-pagination
            :page-size="memberListPageSize"
            layout="prev, pager, next,jumper"
            :total="memberListTotal"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import $ from 'jquery'
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'memberList',
    data () {
      return {
        memberParams: {page: 1, size: 10}, // 会员列表参数
        memberList: [], // 会员列表
        memberListTotal: 10, // 会员总个数
        memberListPageSize: 10, // 每页个数
        pageNumber: ''
      }
    },
    methods: {
      // 改变页码
      handleCurrentChange: function (val) {
        var that = this
        that.memberParams.page = val
        rq.allMember(that.memberParams).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.memberList = data.data.data
          } else if (data.result === '失败') {
            that.memberList = []
          }
        })
      }
    },
    mounted () {
      var that = this
      rq.allMember(that.memberParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.memberList = data.data.data
          that.memberListTotal = data.data.totalRecord
          that.memberListPageSize = data.data.pageSize
        } else if (data.result === '失败') {
          that.memberList = []
        }
      })
    },
    components: {
      mBreadcrumb
    }
}
</script>

<style>
  .pages .el-pagination .el-pager li.number{
    margin-right: 5px;
    border:1px solid #9c9b9c;
  }
  .pages .el-pagination .el-pager li.number:hover{
    color: #ec6a47;
  }
  .pages .el-pagination button:hover{
    color: #ec6a47;
  }
  .pages .el-pagination .el-pager li.active{
    color: #494d56;
    border:1px solid #494d56;
  }
</style>
<!--引入样式-->
<style lang="scss" scoped>@import "scss/memberList";</style>
