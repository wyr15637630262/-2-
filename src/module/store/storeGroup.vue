<!--
  - storeDetail.vue Vue 文件
  - @JsName storeDetail.vue
  - @Description
  - @DateTime 2017/12/6 15:41
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="店铺管理" mTitle2="店铺分组"></m-Breadcrumb>
    <div class="storeGroup_content">
      <div class="query_criteria">
        <div class="query_name"><label>名称</label><input type="text" v-model="checkInfo.groupName"></div>
        <div class="query_ensure"><input type="button" value="查询" @click="check()"></div>
        <div class="query_newAdd" @click="addGoodsTag"><a>+新增</a></div>
      </div>
      <table class="storeList_table">
        <thead>
        <tr>
          <td style="width: 20%">编号</td>
          <td style="width: 20%">分组名称</td>
          <td style="width: 20%">描述</td>
          <td style="width: 20%">创建时间</td>
          <td style="width: 20%">操作</td>
        </tr>
        </thead>
        <tbody v-if="storeGroupList.length!==0">
        <tr v-for="(item,index) in storeGroupList">
          <td>00{{index+1}}</td>
          <td>{{item.groupName}}</td>
          <td>{{item.memo}}</td>
          <td>{{item.createTime|date('YYYY-MM-DD')}}</td>
          <td><a @click="editor(item.groupName,item.memo,item.id)">编辑</a><a style="padding: 0 10px">|</a><a @click="editDelete(item.id)">删除</a></td>
        </tr>
        </tbody>
        <tbody v-else-if="storeGroupList.length===0">
        <tr>
          <td colspan="7" >暂无数据...</td>
        </tr>
        </tbody>
      </table>
      <div class="storeList_page" v-if="storeGroupList.length!==0">
        <div class="pages">
          <el-pagination
            :page-size="storeGroupListPageSize"
            layout="prev, pager, next,jumper"
            :total="storeGroupListTotal"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--增加-->
    <div class="addMask" v-if="adds">
      <div class="addMask_content">
        <div class="addMaskC_top">
          <a>店铺管理</a>
          <a>-</a>
          <a style="color:#ec6a47">新增分组</a>
        </div>
        <div class="addMaskC_center">
          <div class="adc_content">
            <div class="tagName">
              <label >分组名称</label>
              <input type="text" v-model="increaseGroupInfo.groupName">
            </div>
            <div class="sort">
              <label >备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
              <input type="text" v-model="increaseGroupInfo.memo">
            </div>
          </div>
        </div>
        <div class="addMaskC_bottom">
          <div class="adb_content">
            <input type="button" value="取消" @click="addCancle()">
            <input type="button" value="保存" @click="addConfirm()">
          </div>
        </div>
      </div>
    </div>
    <!--编辑-->
    <div class="mask" v-if="edit">
      <div class="mask_content">
        <div class="maskC_top">
          <a>店铺管理</a>
          <a>-</a>
          <a style="color:#ec6a47">编辑分组</a>
        </div>
        <div class="maskC_center">
          <div class="mc_content">
            <div class="tagName">
              <label >分组名称</label>
              <input type="text" v-model="modifyGroupName">
            </div>
            <div class="sort">
              <label >备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</label>
              <input type="text" v-model="modifyGroupRemark">
            </div>
          </div>
        </div>
        <div class="maskC_bottom">
          <div class="mb_content">
            <input type="button" value="取消" @click="editCancle()">
            <input type="button" value="保存" @click="editConfirm()">
          </div>
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
        storeGroupParams: {page: 1, size: 10}, // 店铺分组参数
        storeGroupList: [], // 店铺分组列表
        storeGroupListTotal: 10, // 店铺分组总个数
        storeGroupListPageSize: 10, // 每页个数
        pageNumber: '',
        adds: false, // 增加标识
        edit: false, // 编辑标识
        modifyGroupName: '', // 修改分组
        modifyGroupRemark: '', // 修改备注
        increaseGroupInfo: {groupName: '', memo: ''}, // 添加分组参数
        modifyGroupInfo: {id: '', groupName: '', memo: ''}, // 修改分组参数
        removeGroupInfo: {id: ''}, // 删除分组参数
        checkInfo: {page: 1, size: 10, groupName: '', sorting: 'asc'} // 查询信息
      }
    },
    methods: {
      // 查询分组
      check: function () {
        var that = this
        rq.checkStoreGroupList(that.checkInfo).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.storeGroupList = data.data.data
            that.storeGroupListTotal = data.data.totalRecord
            that.storeGroupListPageSize = data.data.totalpageNumber
            that.checkInfo.groupName = ''
          } else if (data.result === '失败') {
            that.storeGroupList = []
          }
        })
      },
      // 改变页码
      handleCurrentChange: function (val) {
        var that = this
        that.storeGroupParams.page = val
        rq.obtainStoreGroupList(that.storeGroupParams).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.storeGroupList = data.data.data
          } else if (data.result === '失败') {
            that.storeGroupList = []
          }
        })
      },
      // 提示信息
      showMessage (type, duration, message, callback) {
        this.$message({
          type: type,
          duration: duration,
          showClose: false,
          message: message,
          onClose: (el) => {
            if (callback) callback(el)
          }
        })
      },
      // 判断是否为空
      addValidator () {
        var that = this
        if (that.increaseGroupInfo.groupName === '' || that.increaseGroupInfo.groupName === undefined) {
          that.showMessage('info', 2000, '请输入分组名称'); return false
        } else if (that.increaseGroupInfo.memo === '' || that.increaseGroupInfo.memo === undefined) {
          that.showMessage('info', 2000, '请输入备注'); return false
        } else {
          return true
        }
      },
      // 判断是否为空
      modifyValidator () {
        var that = this
        if (that.modifyGroupName === '' || that.modifyGroupName === undefined) {
          that.showMessage('info', 2000, '请输入分组名称'); return false
        } else if (that.modifyGroupRemark === '' || that.modifyGroupRemark === undefined) {
          that.showMessage('info', 2000, '请输入备注'); return false
        } else {
          return true
        }
      },
      // 增加分组
      addGoodsTag: function () {
        this.adds = true
      },
      // 增加 取消
      addCancle: function () {
        this.adds = false
        this.increaseGroupInfo.groupName = ''
        this.increaseGroupInfo.memo = ''
      },
      // 增加 确定
      addConfirm: function () {
        var that = this
        if (that.addValidator()) {
          rq.addStoreGroupList(that.increaseGroupInfo).then(function (data) {
            if (data.result === '成功') {
              rq.obtainStoreGroupList(that.storeGroupParams).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.storeGroupList = data.data.data
                  that.storeGroupListTotal = data.data.totalRecord
                  that.storeGroupListPageSize = data.data.totalpageNumber
                  that.adds = false
                  that.increaseGroupInfo.groupName = ''
                  that.increaseGroupInfo.memo = ''
                } else if (data.result === '失败') {
                  that.storeGroupList = []
                }
              })
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '添加失败')
            }
          })
        }
      },
      // 编辑
      editor: function (groupName, memo, id) {
        this.edit = true
        this.modifyGroupName = groupName
        this.modifyGroupRemark = memo
        this.modifyGroupInfo.id = id
      },
      // 编辑 取消
      editCancle: function () {
        this.edit = false
      },
      // 编辑 确定
      editConfirm: function () {
        var that = this
        that.edit = false
        that.modifyGroupInfo.groupName = that.modifyGroupName
        that.modifyGroupInfo.memo = that.modifyGroupRemark
        if (that.modifyValidator()) {
          rq.modifyStoreGroupList(that.modifyGroupInfo).then(function (data) {
            if (data.result === '成功') {
              rq.obtainStoreGroupList(that.storeGroupParams).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.storeGroupList = data.data.data
                  that.storeGroupListTotal = data.data.totalRecord
                  that.storeGroupListPageSize = data.data.totalpageNumber
                  that.edit = false
                } else if (data.result === '失败') {
                  that.storeGroupList = []
                }
              })
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '修改失败')
            }
          })
        }
      },
      // 删除
      editDelete: function (id) {
        console.log(id)
        var that = this
        that.removeGroupInfo.id = id
        that.$confirm('此操作将删除该店铺分组, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          rq.removeStoreGroupList(that.removeGroupInfo).then(function (data) {
            if (data.result === '成功') {
              that.$message({
                type: 'success',
                message: '删除成功!'
              })
              rq.obtainStoreGroupList(that.storeGroupParams).then(function (data) {
                if (data.result === '成功') {
                  console.log(data)
                  that.storeGroupList = data.data.data
                  that.storeGroupListTotal = data.data.totalRecord
                  that.storeGroupListPageSize = data.data.totalpageNumber
                } else if (data.result === '失败') {
                  that.storeGroupList = []
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
      }
    },
    mounted () {
      var that = this
      rq.obtainStoreGroupList(that.storeGroupParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.storeGroupList = data.data.data
          that.storeGroupListTotal = data.data.totalRecord
          that.storeGroupListPageSize = data.data.totalpageNumber
        } else if (data.result === '失败') {
          that.storeGroupList = []
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
<style lang="scss" scoped>@import "scss/storeGroup";</style>
