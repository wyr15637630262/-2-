<!--
  - storeAdd.vue Vue 文件
  - @JsName storeAdd.vue
  - @Description
  - @DateTime 2017/12/6 15:41
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="店铺管理" mTitle2="店铺添加"></m-Breadcrumb>
    <div class="storeAdd_content">
      <div class="storeAddContent">
        <!--店铺名称-->
        <div class="branchName">
          <label>店铺名称</label>
          <input type="text" v-model="addStoreParams.branchName">
        </div>
        <!--店铺编码-->
        <div class="branchCode">
          <label>店铺编码</label>
          <input type="number" v-model="addStoreParams.branchCode">
        </div>
        <!--店铺状态-->
        <div class="status">
          <label>店铺状态</label>
          <el-radio-group v-model="radio1">
            <el-radio :label="1">营业中</el-radio>
            <el-radio :label="2">休息中</el-radio>
            <el-radio :label="3">已注销</el-radio>
          </el-radio-group>
        </div>
        <!--店铺属性-->
        <div class="property">
          <label>店铺属性</label>
          <el-radio-group v-model="radio2">
            <el-radio :label="4">本地门店</el-radio>
            <el-radio :label="5">外地门店</el-radio>
          </el-radio-group>
        </div>
        <!--店铺分组-->
        <div class="group">
          <label>店铺分组</label>
          <el-select v-model="value" placeholder="请选择"  @change="changeValue">
            <el-option
              v-for="item in storeGroupList"
              :key="item.id"
              :label="item.groupName"
              :value="item.groupName">
            </el-option>
          </el-select>
        </div>
        <!--店铺地址-->
        <div class="adress">
          <div class="adress_label"><a>店铺地址</a></div>
          <div class="example">
            <select v-model="prov">
              <option v-for="option in arr" :value="option.name">
                {{ option.name }}
              </option>
            </select>
            <select v-model="city">
              <option v-for="option in cityArr" :value="option.name">
                {{ option.name }}
              </option>
            </select>
            <select v-model="district" v-if="district">
              <option v-for="option in districtArr" :value="option.name">
                {{ option.name }}
              </option>
            </select>
            <input type="text" placeholder="请输入街道/小区/楼盘" v-model="addStoreParams.areaVillage">
          </div>
        </div>
        <!--详细地址-->
        <div class="detailAdress">
          <input type="text" placeholder="请输入详细地址" v-model="addStoreParams.detailAddress">
        </div>
        <!--店铺面积-->
        <div class="acreage">
          <label>店铺面积</label>
          <input type="text" v-model="addStoreParams.acreage">
        </div>
        <!--店铺类型-->
        <div class="branchType">
          <label>店铺类型</label>
          <el-radio-group v-model="radio3">
            <el-radio :label="6">自营店</el-radio>
            <el-radio :label="7">加盟店</el-radio>
          </el-radio-group>
        </div>
        <!--商圈-->
        <div class="district">
          <label class="labelStyle">商 圈</label>
          <el-radio-group v-model="radio4">
            <el-radio :label="8">默认</el-radio>
            <el-radio :label="9">生活社区</el-radio>
            <el-radio :label="10">商业中心</el-radio>
            <el-radio :label="11">休闲娱乐</el-radio>
            <el-radio :label="12">学区</el-radio>
            <el-radio :label="13">交通枢纽</el-radio>
          </el-radio-group>
        </div>
        <!--营业时间-->
        <div class="openingTime">
          <label>营业时间</label>
          <input type="time" v-model="addStoreParams.openingTime">
          <input type="time" v-model="addStoreParams.endTime">
        </div>
        <!--管理模式-->
        <div class="manageMode">
          <label>管理模式</label>
          <el-radio-group v-model="radio5">
            <el-radio :label="14">紧密型</el-radio>
          </el-radio-group>
        </div>
        <!--起送价格-->
        <div class="reservePrice">
          <label>起送价格</label>
          <input type="number" v-model="addStoreParams.reservePrice">
        </div>
        <!--排序权重-->
        <div class="sortOrder">
          <label>排序权重</label>
          <input type="number" v-model="addStoreParams.sortOrder">
        </div>
        <!--店铺描述-->
        <div class="branchDes">
          <label>店铺描述</label>
          <textarea cols="30" rows="3" v-model="addStoreParams.branchDes"></textarea>
        </div>

      </div>
      <div class="storeAdd_button">
        <input type="button" value="保存" @click="increaseStore">
      </div>
    </div>
  </div>
</template>

<script>
  import mBreadcrumb from './../../component/headerTag.vue'
  import rq from './../../http/require.js'
  const dataSource = require('../../api/areaData.js')
  export default {
    name: 'storeAdd',
    data () {
      return {
        storeGroupParams: {page: 1, size: 10}, // 店铺分组参数
        storeGroupList: [], // 店铺分组列表
        radio1: 1, // 店铺状态
        radio2: 4, // 店铺属性
        radio3: 6, // 店铺类型
        radio4: 8, // 商圈
        radio5: 14, // 管理模式
        value: '', // 店铺分组
        addStoreParams: {
          id: '', // 店铺ID
          groupId: 1, // 分组ID
          status: '', // 店铺状态
          branchName: '', // 分店名称
          branchCode: '', // 分店编码
          property: '', // 分店(仓库)属性
          province: '', // 省份
          city: '', // 城市
          area: '', // 区域
          areaVillage: '', // 街道/小区/楼盘
          detailAddress: '', // 详细地址
          acreage: '', // 门店面积
          reservePrice: '', // 起送价
          branchType: '', // 门店类型
          district: '', // 商圈
          manageMode: '', // 管理模式
          sortOrder: '', // 排序权重
          openingTime: '', // 营业时间
          endTime: '', // 结束时间
          branchDes: '' // 店铺描述
        }, // 添加店铺的参数
        arr: dataSource.arrAll, // 省市区
        prov: '北京', // 省份
        city: '北京', // 城市
        district: '东城区', // 地区
        cityArr: [],
        districtArr: [],
        editInfo: [] // 要编辑的值
      }
    },
    methods: {
      // 下拉框选择
      changeValue: function (value) {
        this.value = value
        let obj = {}
        obj = this.storeGroupList.find((item) => {
          return item.groupName === value
        })
        console.log(obj.id)
        this.addStoreParams.groupId = obj.id
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
      // 判断条件
      validator () {
        var that = this
        if (that.addStoreParams.branchName === '' || that.addStoreParams.branchName === undefined) {
          that.showMessage('info', 2000, '请输入名称'); return false
        } else if (that.addStoreParams.branchCode === '' || that.addStoreParams.branchCode === undefined) {
          that.showMessage('info', 2000, '请输入店铺编码'); return false
        } else if (that.addStoreParams.acreage === '' || that.addStoreParams.acreage === undefined) {
          that.showMessage('info', 2000, '请输入店铺面积'); return false
        } else if (that.addStoreParams.openingTime === '' || that.addStoreParams.openingTime === undefined) {
          that.showMessage('info', 2000, '请输入营业时间'); return false
        } else if (that.addStoreParams.endTime === '' || that.addStoreParams.endTime === undefined) {
          that.showMessage('info', 2000, '请输入结束时间'); return false
        } else if (that.addStoreParams.reservePrice === '' || that.addStoreParams.reservePrice === undefined) {
          that.showMessage('info', 2000, '请输入起送价'); return false
        } else if (that.addStoreParams.sortOrder === '' || that.addStoreParams.sortOrder === undefined) {
          that.showMessage('info', 2000, '请输入排序权重'); return false
        } else if (that.addStoreParams.branchDes === '' || that.addStoreParams.branchDes === undefined) {
          that.showMessage('info', 2000, '请输入店铺描述'); return false
        } else if (that.value === '' || that.value === undefined) {
          that.showMessage('info', 2000, '请选择分组'); return false
        } else if (that.addStoreParams.areaVillage === '' || that.addStoreParams.areaVillage === undefined) {
          that.showMessage('info', 2000, '请输入街道'); return false
        } else if (that.addStoreParams.detailAddress === '' || that.addStoreParams.detailAddress === undefined) {
          that.showMessage('info', 2000, '请输入详细地址'); return false
        } else {
          return true
        }
      },
      // 增加店铺
      increaseStore: function () {
        var that = this
        that.addStoreParams.province = that.prov
        that.addStoreParams.city = that.city
        that.addStoreParams.area = that.district
        // 店铺状态
        if (that.radio1 === 1) {
          that.addStoreParams.status = 0
        } else if (that.radio1 === 2) {
          that.addStoreParams.status = 1
        } else if (that.radio1 === 3) {
          that.addStoreParams.status = 2
        }
        // 店铺属性
        if (that.radio2 === 4) {
          that.addStoreParams.property = 0
        } else if (that.radio2 === 5) {
          that.addStoreParams.property = 1
        }
        // 店铺类型
        if (that.radio3 === 6) {
          that.addStoreParams.branchType = 0
        } else if (that.radio3 === 7) {
          that.addStoreParams.branchType = 1
        }
        // 商圈
        if (that.radio4 === 8) {
          that.addStoreParams.district = 0
        } else if (that.radio4 === 9) {
          that.addStoreParams.district = 1
        } else if (that.radio4 === 10) {
          that.addStoreParams.district = 2
        } else if (that.radio4 === 11) {
          that.addStoreParams.district = 3
        } else if (that.radio4 === 12) {
          that.addStoreParams.district = 4
        } else if (that.radio4 === 14) {
          that.addStoreParams.district = 5
        }
        // 管理模式
        if (that.radio5 === 14) {
          that.addStoreParams.manageMode = 0
        }
        if (that.validator()) {
          rq.modifyStoreList(that.addStoreParams).then(function (data) {
            if (data.result === '成功') {
              console.log('111')
              that.$router.push({name: 'storeList'})
            } else if (data.result === '失败') {
              that.showMessage('info', 2000, '添加失败'); return false
            }
          })
        }
      },
      updateCity: function () {
        for (var i in this.arr) {
          var obj = this.arr[i]
          if (obj.name == this.prov) {
            this.cityArr = obj.sub
            break
          }
        }
        this.city = this.cityArr[1].name
      },
      updateDistrict: function () {
        for (var i in this.cityArr) {
          var obj = this.cityArr[i]
          if (obj.name == this.city) {
            this.districtArr = obj.sub
            break
          }
        }
        if (this.districtArr && this.districtArr.length > 0 && this.districtArr[1].name) {
          this.district = this.districtArr[1].name
        } else {
          this.district = ''
        }
      }
    },
    mounted () {
      var that = this
      var array = that.$route.params.list
      var index = that.$route.params.listIndex
      that.addStoreParams.id = that.$route.params.listId
      that.editInfo = array[index]
      console.log(that.editInfo)
      that.addStoreParams.branchName = that.editInfo.branchName
      that.addStoreParams.branchCode = that.editInfo.branchCode
      // 状态
      if (that.editInfo.status = 0) {
        that.radio1 = 1
      } else if (that.editInfo.status = 1) {
        that.radio1 = 2
      } else if (that.editInfo.status = 2) {
        that.radio1 = 3
      }
      // 属性
      if (that.editInfo.property = 0) {
        that.radio2 = 4
      } else if (that.editInfo.property = 1) {
        that.radio2 = 5
      }
      // 分组 根据groupId找到对应item下的分组名称
      rq.obtainStoreGroupList(that.storeGroupParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.storeGroupList = data.data.data
          var gro = {}
          gro = that.storeGroupList.find((item) => {
            return item.id === that.editInfo.groupId
          })
          that.value = gro.groupName
        } else if (data.result === '失败') {
          that.storeGroupList = []
        }
      })
      // 地址
      // 面积
      that.addStoreParams.acreage = that.editInfo.acreage
      // 类型
      if (that.editInfo.branchType = 0) {
        that.radio3 = 6
      } else if (that.editInfo.branchType = 1) {
        that.radio3 = 7
      }
      // 商圈
      if (that.editInfo.district = 0) {
        that.radio4 = 8
      } else if (that.editInfo.district = 1) {
        that.radio4 = 9
      } else if (that.editInfo.district = 2) {
        that.radio4 = 10
      } else if (that.editInfo.district = 3) {
        that.radio4 = 11
      } else if (that.editInfo.district = 4) {
        that.radio4 = 12
      } else if (that.editInfo.district = 5) {
        that.radio4 = 14
      }
      // 营业时间
      that.addStoreParams.openingTime = that.editInfo.openingTime
      that.addStoreParams.endTime = that.editInfo.endTime
      // 起送价格
      that.addStoreParams.reservePrice = that.editInfo.reservePrice
      // 排序权重
      that.addStoreParams.sortOrder = that.editInfo.sortOrder
      // 描述
      that.addStoreParams.branchDes = that.editInfo.branchDes
    },
    components: {
      mBreadcrumb
    },
    beforeMount: function () {
      this.updateCity()
      this.updateDistrict()
    },
    watch: {
      prov: function () {
        this.updateCity()
        this.updateDistrict()
      },
      city: function () {
        this.updateDistrict()
      }
    }
  }
</script>
<style>
  .group .el-select{
    height: 32px;
  }
  .group .el-select .el-input{
    height: 32px;
  }
  .group .el-select .el-input .el-input__inner{
    height: 32px;
  }
</style>
<!--引入样式-->
<style lang="scss" scoped>@import "scss/storeAdd";</style>
