
<template>
  <div>
    <m-Breadcrumb mTitle1="店铺管理" mTitle2="店铺列表"></m-Breadcrumb>
  	<div class="storeList_content">
      <div class="query_criteria">
        <div class="query_name"><label>名称</label><input type="text" v-model="checkInfo.branchName"></div>
        <div class="query_ensure"><input type="button" value="查询" @click="check()"></div>
        <div class="query_newAdd" @click="$router.push({name:'storeAdd'})"><a>+新增</a></div>
      </div>
      <table class="storeList_table">
      <thead>
      <tr>
        <td style="width: 10%">编号</td>
        <td style="width: 18%">店铺名称</td>
        <td style="width: 13%">店铺属性</td>
        <td style="width: 14%">店铺类型</td>
        <td style="width: 10%">排序权重</td>
        <td style="width: 20%">营业时间</td>
        <td style="width: 15%">操作</td>
      </tr>
      </thead>
      <tbody v-if="storeList.length!==0">
      <tr v-for="(item,index) in storeList">
        <td>00{{index+1}}</td>
        <td>{{item.branchName}}</td>
        <td>{{item.property|propertys}}</td>
        <td>{{item.branchType|branchTypes}}</td>
        <td>{{item.sortOrder}}</td>
        <td><a>{{item.openingTime}}</a><a style="padding: 0 5px">-</a><a>{{item.endTime}}</a></td>
        <td><a @click="$router.push({name:'storeModify',params:{list: storeList, listIndex: index}})">编辑</a><a style="padding: 0 10px">|</a><a @click="storeDelete(item.id)">删除</a></td>
      </tr>
      </tbody>
      <tbody v-else-if="storeList.length===0">
      <tr>
        <td colspan="7" >暂无数据...</td>
      </tr>
      </tbody>
    </table>
      <div class="storeList_page" v-if="storeList.length!==0">
        <div class="pages">
          <el-pagination
            :page-size="storeListPageSize"
            layout="prev, pager, next,jumper"
            :total="storeListTotal"
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
    name: 'storeList',
    data () {
      return {
        storeParams: {page: 1, size: 10}, // 店铺列表参数
        storeList: [], // 店铺列表
        storeListTotal: 10, // 店铺总个数
        storeListPageSize: 10, // 每页个数
        pageNumber: '',
        removeStoreParams: {id: ''}, // 删除店铺参数
        checkInfo: {branchName: '', page: 1, size: 10} // 查询条件
      }
    },
    methods: {
      // 改变页码
      handleCurrentChange: function (val) {
        var that = this
        that.storeParams.page = val
        rq.obtainStoreList(that.storeParams).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.storeList = data.data.data
          } else if (data.result === '失败') {
            that.storeList = []
          }
        })
      },
      // 删除
      storeDelete: function (id) {
        var that = this
        that.removeStoreParams.id = id
        that.$confirm('此操作将删除该店铺, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rq.removeStoreList(that.removeStoreParams).then(function (data) {
            if (data.result === '成功') {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
              rq.obtainStoreList(that.storeParams).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.storeList = data.data.data
                  that.storeListTotal = data.data.totalPageNumber
                  that.storeListPageSize = data.data.pageNumber
                } else if (data.result === '失败') {
                  that.storeList = []
                }
              })
            } else if (data.result === '失败') {
              console.log('删除失败')
            }
          })
        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      // 查询
      check: function () {
        var that = this
        rq.checkStoreList(that.checkInfo).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.storeList = data.data.data
            that.storeListTotal = data.data.totalPageNumber
            that.storeListPageSize = data.data.pageNumber
            that.checkInfo.branchName = ''
          } else if (data.result === '失败') {
            that.storeList = []
          }
        })
      }
    },
    mounted () {
      var that = this
      rq.obtainStoreList(that.storeParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.storeList = data.data.data
          that.storeListTotal = data.data.totalPageNumber
          that.storeListPageSize = data.data.pageNumber
        } else if (data.result === '失败') {
          that.storeList = []
        }
      })
    },
    components: {
      mBreadcrumb
    },
    filters: {
      propertys: function (input) {
        var orderStatus = ''
        if (input = 0) {
          orderStatus = '本地门店'
        } else if (input = 1) {
          orderStatus = '外部门店'
        }
        return orderStatus
      },
      branchTypes: function (input) {
        var orderStatus = ''
        if (input = 0) {
          orderStatus = '自营型'
        } else if (input = 1) {
          orderStatus = '加盟型'
        }
        return orderStatus
      }
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
<style lang="scss" scoped>@import "scss/storeList";</style>
