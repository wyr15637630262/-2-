<!--
  - commodityVariety Vue 文件
  - @JsName commodityVariety
  - @Description
  - @DateTime 2017/12/11 16:31
  - @author 亚茹
  -->
<!--
$router.push({name:'memberDetail',params:{userId: 123}})
-->
<template>
  <div>
    <m-Breadcrumb mTitle1="商品管理" mTitle2="商品标签"></m-Breadcrumb>
    <div class="commodityTag_content">
      <div class="query_criteria">
        <div class="query_name"><label>名称</label><input type="text" v-model="checkTagParams.labelName"></div>
        <div class="query_ensure"><input type="button" value="查询" @click="check"></div>
        <div class="query_recycled" @click="rubish()"><a>回收站</a><img src="./../../../static/images/select.png" v-show="imgShow"></div>
        <div class="query_newAdd" @click="addGoodsTag()"><a>+新增</a></div>
      </div>
      <table class="commodityTag_table">
        <thead>
        <tr>
          <td style="width: 16%">编号</td>
          <td style="width: 16%">名称</td>
          <td style="width: 16%">排序</td>
          <td style="width: 16%">商品数</td>
          <td style="width: 20%">创建时间</td>
          <td style="width: 16%">操作</td>
        </tr>
        </thead>
        <tbody v-if="tagList.length!==0">
        <tr v-for="(item,index) in tagList">
          <td>00{{index+1}}</td>
          <td>{{item.labelName}}</td>
          <td>{{item.sortPriority}}</td>
          <td>{{item.productNumber}}</td>
          <td>{{item.createTime|date('YYYY-MM-DD')}}</td>
          <td>
            <a @click="goEditor(item.labelName,item.sortPriority,item.id)">{{msg1}}</a>
            <a style="padding: 0 10px">|</a>
            <a @click="goDelete(item.id)">{{msg2}}</a>
          </td>
        </tr>
        </tbody>
        <tbody v-else-if="tagList.length===0">
        <tr>
          <td colspan="7" >暂无数据...</td>
        </tr>
        </tbody>
      </table>
      <div class="commodityTag_page" v-if="tagList.length!==0">
        <div class="pages">
          <el-pagination
            :page-size="tagListPageSize"
            layout="prev, pager, next,jumper"
            :total="tagListTotal"
            @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </div>
    </div>
    <!--编辑-->
    <div class="mask" v-if="edit">
      <div class="mask_content">
        <div class="maskC_top">
          <a>商品标签</a>
          <a>-</a>
          <a style="color:#ec6a47">编辑标签</a>
        </div>
        <div class="maskC_center">
          <div class="mc_content">
            <div class="tagName">
              <label >标签名称</label>
              <input type="text" v-model="editTag.labelName" ref="reviseTagName">
            </div>
            <div class="sort">
              <label >排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</label>
              <input type="number" v-model="editTag.sortPriority" ref="reviseTagSort">
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
    <!--增加-->
    <div class="addMask" v-if="adds">
      <div class="addMask_content">
        <div class="addMaskC_top">
          <a>商品标签</a>
          <a>-</a>
          <a style="color:#ec6a47">新增标签</a>
        </div>
        <div class="addMaskC_center">
          <div class="adc_content">
            <div class="tagName">
              <label >标签名称</label>
              <input type="text" v-model="addTag.labelName">
            </div>
            <div class="sort">
              <label >排&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;序</label>
              <input type="number" v-model="addTag.sortPriority">
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
  </div>
</template>

<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  export default {
    name: 'commodityTag',
    data () {
      return {
        tagParams: {isRecycled: 1, page: 1, size: 10}, // 商品标签参数
        checkTagParams: {labelName: '', isRecycled: 1, page: 1, size: 10}, // 查询商品标签参数
        recycleTagParams: {isRecycled: 0, page: 1, size: 10}, // 回收站商品规格参数
        addTag: {labelName: '', sortPriority: ''}, // 增加标签
        editTag: {id: '', labelName: '', sortPriority: ''}, // 编辑标签
        tagList: [], // 标签列表
        tagListTotal: 10, // 标签总个数
        tagListPageSize: 10, // 每页个数
        pageNumber: '',
        imgShow: false, // 回收站标识
        adds: false, // 新增标识
        edit: false, // 编辑标识
        msg1: '编辑',
        msg2: '删除'
      }
    },
    methods: {
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
      // 编辑判断条件
      editValidator () {
        var that = this
        if (that.editTag.labelName === '' || that.editTag.labelName === undefined) {
          that.showMessage('info', 2000, '请输入标签名称'); return false
        } else if (that.editTag.sortPriority === '' || that.editTag.sortPriority === undefined) {
          that.showMessage('info', 2000, '请输入排序权重'); return false
        } else {
          return true
        }
      },
      // 增加判断条件
      addValidator () {
        var that = this
        if (that.addTag.labelName === '' || that.addTag.labelName === undefined) {
          that.showMessage('info', 2000, '请输入标签名称'); return false
        } else if (that.addTag.sortPriority === '' || that.addTag.sortPriority === undefined) {
          that.showMessage('info', 2000, '请输入排序权重'); return false
        } else {
          return true
        }
      },
      // 改变页码
      handleCurrentChange: function (val) {
        var that = this
        console.log(val)
        that.tagParams.page = val
        rq.searchAllTag(that.tagParams).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.tagList = data.data.data
          } else if (data.result === '失败') {
            that.tagList = []
          }
        })
      },
      // 查询列表参数
      check: function () {
        var that = this
        rq.searchByLabeiName(that.checkTagParams).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            that.tagList = data.data.data
            that.tagListTotal = data.data.totalRecord
            that.tagListPageSize = data.data.pageSize
          } else if (data.result === '失败') {
            that.tagList = []
          }
        })
      },
      // 编辑或恢复
      goEditor: function (labelName, sortPriority, id) {
        var that = this
        if (that.imgShow === false) {
          that.edit = true
          that.editTag.id = id
          that.editTag.labelName = labelName
          that.editTag.sortPriority = sortPriority
        } else {
          rq.backTag(id).then(function (data) {
            if (data.result === '成功') {
              rq.searchAllTag(that.recycleTagParams).then(function (data) {
                if (data.result === '成功') {
                  that.tagList = data.data.data
                  that.tagListTotal = data.data.totalRecord
                  that.tagListPageSize = data.data.pageSize
                } else if (data.result === '失败') {
                  that.tagList = []
                }
              })
            } else if (data.result === '失败') {
              that.tagList = []
            }
          })
        }
      },
      // 编辑取消
      editCancle: function () {
        this.edit = false
      },
      // 编辑确定
      editConfirm: function () {
        var that = this
        if (that.editValidator()) {
          // 验证标签
          rq.checkTagName(that.editTag.labelName).then(function (data) {
            if (data.result === '成功') {
              // 修改标签
              rq.reviseTag(that.editTag).then(function (data) {
                if (data.result === '成功') {
                  that.showMessage('info', 2000, '修改成功')
                  // 标签列表
                  rq.searchAllTag(that.tagParams).then(function (data) {
                    if (data.result === '成功') {
                      console.log(data)
                      that.tagList = data.data.data
                      that.tagListTotal = data.data.totalRecord
                      that.tagListPageSize = data.data.pageSize
                    } else if (data.result === '失败') {
                      that.tagList = []
                    }
                  })
                } else if (data.result === '失败') {
                  that.showMessage('info', 2000, '修改失败')
                }
              })
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '该标签已存在')
            }
          })
          this.edit = false
        }
      },
      // 新增
      addGoodsTag: function () {
        this.adds = true
      },
      // 新增取消
      addCancle: function () {
        this.adds = false
      },
      // 新增确定及验证该标签是否存在
      addConfirm: function () {
        var that = this
        if (that.addValidator()) {
          // 验证标签
          rq.checkTagName(that.addTag.labelName).then(function (data) {
            if (data.result === '成功') {
              // 添加标签
              rq.addTag(that.addTag).then(function (data) {
                if (data.result === '成功') {
                  that.showMessage('info', 2000, '添加成功')
                  // 标签列表
                  rq.searchAllTag(that.tagParams).then(function (data) {
                    if (data.result === '成功') {
                      console.log(data)
                      that.tagList = data.data.data
                      that.tagListTotal = data.data.totalRecord
                      that.tagListPageSize = data.data.pageSize
                      that.addTag.labelName = ''
                      that.addTag.sortPriority = ''
                    } else if (data.result === '失败') {
                      that.tagList = []
                    }
                  })
                } else if (data.result === '失败') {
                  that.showMessage('info', 2000, '添加失败')
                }
              })
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '该标签已存在')
            }
          })
          that.adds = false
        }
      },
      // 移入回收站及彻底删除
      goDelete: function (id) {
        console.log(id)
        var that = this
        if (that.imgShow === false) {
          // 移入回收站
          that.$confirm('此操作将删除该标签, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            rq.removeTagRubbish(id).then(function (data) {
              if (data.result === '成功') {
                that.showMessage('info', 2000, '删除成功')
                rq.searchAllTag(that.tagParams).then(function (data) {
                  if (data.result === '成功') {
                    that.tagList = data.data.data
                    that.tagListTotal = data.data.totalRecord
                    that.tagListPageSize = data.data.pageSize
                  } else if (data.result === '失败') {
                    that.tagList = []
                  }
                })
              } else if (data.result === '失败') {
                that.showMessage('info', 2000, '删除失败')
              }
            })
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        } else {
          // 彻底删除
          that.$confirm('此操作将彻底删除该标签, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            rq.removeTag(id).then(function (data) {
              if (data.result === '成功') {
                rq.searchAllTag(that.recycleTagParams).then(function (data) {
                  if (data.result === '成功') {
                    that.tagList = data.data.data
                    that.tagListTotal = data.data.totalRecord
                    that.tagListPageSize = data.data.pageSize
                  } else if (data.result === '失败') {
                    that.tagList = []
                  }
                })
              } else if (data.result === '失败') {
                that.showMessage('info', 2000, '删除失败')
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
      // 回收站
      rubish: function () {
        var that = this
        that.imgShow = !that.imgShow
        if (that.imgShow === true) {
          that.msg1 = '恢复'
          that.msg2 = '彻底删除'
          rq.searchAllTag(that.recycleTagParams).then(function (data) {
            if (data.result === '成功') {
              console.log(data)
              that.tagList = data.data.data
              that.tagListTotal = data.data.totalRecord
              that.tagListPageSize = data.data.pageSize
            } else if (data.result === '失败') {
              that.tagList = []
            }
          })
        } else {
          that.msg1 = '编辑'
          that.msg2 = '删除'
          rq.searchAllTag(that.tagParams).then(function (data) {
            if (data.result === '成功') {
              console.log(data)
              that.tagList = data.data.data
              that.tagListTotal = data.data.totalRecord
              that.tagListPageSize = data.data.pageSize
            } else if (data.result === '失败') {
              that.tagList = []
            }
          })
        }
      }
    },
    mounted () {
      var that = this
      rq.searchAllTag(that.tagParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.tagList = data.data.data
          that.tagListTotal = data.data.totalRecord
          that.tagListPageSize = data.data.pageSize
        } else if (data.result === '失败') {
          that.tagList = []
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
<!-- 引入 commodityVariety Scss 文件  -->
<style lang="scss" scoped>@import "scss/commodityTag";</style>
