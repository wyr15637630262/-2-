<!--
  - commodityVariety Vue 文件
  - @JsName commodityVariety
  - @Description
  - @DateTime 2017/12/11 16:31
  - @author 亚茹
  -->
<template>
  <div>
    <m-Breadcrumb mTitle1="商品管理" mTitle2="商品规格"></m-Breadcrumb>
    <div class="commoditySpec_content">
      <div class="speci-info">
        <div class="specofocation-title">
          <p>商品规格</p>
        </div>
        <div class="specofocation-info">
          <!--商品规格-->
          <div class="product-specification-row" v-for="(data, index) in productAddSkyType">
            <!-- 商品子规格  -->
            <div class="parent-info">
              <div class="parent-info-left" style="overflow: hidden; width: 100%; height: 40px; position: relative">
                <div style="float: left; width: 200px;">
                  <el-select v-model="data.value" filterable @change="change(data,index)" placeholder="请选择">
                    <el-option v-for="parent in productSkyType" :label="parent.specName" :value="parent.specName"></el-option>
                  </el-select>
                </div>
              </div>
            </div>
            <!-- 商品子参数  -->
            <div class="child-info" v-for="(item, childindex) in data.nowChild" style="position: relative">
              <el-input size="small" placeholder="请输入内容" v-model="item.value" readonly></el-input>
            </div>
            <!-- 商品子参数 选择进行添加   -->
            <div v-if="index == 0" class="specifi-sky">
              <el-autocomplete v-if="productSkuState1"
                               class="inline-input" v-model="nowChild_0" :fetch-suggestions="querySearch1"
                               placeholder="添加参数" @select="handleSelect1" style="border: none;  margin-top:9px;"></el-autocomplete>
              <el-button @click="productSkuState(index)" type="text">+添加</el-button>
            </div>
            <div v-if="index == 1" class="specifi-sky">
              <el-autocomplete v-if="productSkuState2"
                               class="inline-input" v-model="nowChild_1" :fetch-suggestions="querySearch2"
                               placeholder="规格参数选择" @select="handleSelect2" style="border: none;margin-top:9px;"></el-autocomplete>
              <el-button @click="productSkuState(index)" type="text">+添加</el-button>
            </div>
            <div v-if="index == 2" class="specifi-sky">
              <el-autocomplete v-if="productSkuState3"
                               class="inline-input" v-model="nowChild_2" :fetch-suggestions="querySearch3"
                               placeholder="规格参数选择" @select="handleSelect3" style="border: none; margin-top:9px;"></el-autocomplete>
              <el-button @click="productSkuState(index)" type="text">+添加</el-button>
            </div>
          </div>

          <!--添加按钮-->
          <div class="Specification_btn">
            <div class="Specification_addBtn">
              <input type="button" value="添加规格" @click="specificationsAdd">
            </div>
          </div>
        </div>
      </div>
      <div v-if="porductDataList[0] !=undefined " class="speci-info" style="margin-top: 20px;">
        <div class="specofocation-title">
          <p>商品库存</p>
        </div>
        <div class="specofocation-info">
          <div class = "vue_list ms-main">
            <div class="el-table el-table&#45;&#45;fit el-table&#45;&#45;border el-table&#45;&#45;enable-row-hover el-table&#45;&#45;enable-row-transition">
              <table class="" style="padding: 0px;width:100%;border-spacing: 0px;" border="0">
                <thead>
                <tr v-if="porductDataList[0] != undefined">
                  <!-- &lt;!&ndash;二级标题&ndash;&gt;-->
                  <th v-if="porductDataList[0].child1.title1 != undefined" colspan="1" rowspan="1" style="border-right:none; padding-right: 0px;padding-left: 0px;min-width:150px;">
                    <div class="cell" style=" text-align: center;min-width:150px;">{{porductDataList[0].child1.title1}}</div>
                  </th>
                  <th  v-if="porductDataList[0].child1.child2.length > 0" colspan="1" rowspan="1" style="border-right:none; border-bottom: none; padding-right: 0px;padding-left: 0px;min-width:150px;">
                    <thead v-if="porductDataList[0].child1.child2.length > 0"  style=" border: none">
                    <th v-if="porductDataList[0].child1.child2[0].child3.length > 0" colspan="1" rowspan="1" style="border-right:none; padding-right: 0px;padding-left: 0px; border-bottom: none;min-width:150px;">
                      <!-- &lt;!&ndash;三级标题&ndash;&gt;-->
                      <thead v-if="porductDataList[0].child1.child2[0].child3.length > 0">
                        <th v-if="porductDataList[0].child1.child2[0].title1 != undefined" colspan="1" rowspan="1" style="border-right:none; border-bottom: none; padding-bottom: 0px; padding-right: 0px;padding-left: 0px;min-width: 150px">
                          <div class="cell" style=" text-align: center;min-width:150px;">{{porductDataList[0].child1.child2[0].title1}}</div>
                        </th>
                        <th colspan="1" rowspan="1" style="border-right:none; border-bottom: none; padding-bottom: 0px; padding-right: 0px;padding-left: 0px;min-width: 150px">
                          <div class="cell" style=" text-align: center;min-width:150px;">{{porductDataList[0].child1.child2[0].child3[0].title1}}</div>
                        </th>
                        <th colspan="1" rowspan="1" style="border-right:none;text-align: center; border-bottom: none; padding-bottom: 0px; padding-right: 0px;padding-left: 0px;min-width: 224px">
                          <div class="cell">价格(元)</div>
                        </th>
                        <th colspan="1" rowspan="1" style="border-right:none;text-align: center; border-bottom: none; padding-bottom: 0px; padding-right: 0px;padding-left: 0px;min-width: 232px">
                          <div class="cell">库存</div>
                        </th>
                        <th colspan="1" rowspan="1"style="border-right:none; text-align: center;border-bottom: none; padding-bottom: 0px; padding-right: 0px;padding-left: 0px;min-width: 150px; width: 40%">
                          <div class="cell">销量</div>
                        </th>
                      </thead>
                    </th>
                    <th v-if="porductDataList[0].child1.child2[0].child3.length <= 0" colspan="1" rowspan="1" style="border-right:none;text-align: center; padding-right: 0px;padding-left: 0px; min-width: 150px">
                      <div v-if="porductDataList[0].child1.child2.length > 0" class="cell" style=" text-align: center;">{{porductDataList[0].child1.child2[0].title1}}</div>
                    </th>
                    <th v-if="porductDataList[0].child1.child2[0].child3.length <= 0"  colspan="1" rowspan="1"  style="border-right:none;text-align: center; padding-right: 0px;padding-left: 0px; min-width: 224px">
                      <div class="cell">价格(元)</div>
                    </th>
                    <th v-if="porductDataList[0].child1.child2[0].child3.length <= 0"  colspan="1" rowspan="1"  style="border-right:none;text-align: center; padding-right: 0px;padding-left: 0px; min-width: 232px">
                      <div class="cell">库存</div>
                    </th>
                    <th v-if="porductDataList[0].child1.child2[0].child3.length <= 0"  colspan="1" rowspan="1" style="border-right:none;text-align: center; padding-right: 0px;padding-left: 0px; min-width: 150px">
                      <div class="cell">销量</div></th><th class="gutter" style="width: 0px;">
                    </th>
                </thead>
                </th>

                  <th v-if="porductDataList[0].child1.child2.length <= 0"  colspan="1" rowspan="1"  style="border-right:none; text-align: center; min-width: 224px">
                    <div class="cell">价格(元)</div>
                  </th>
                  <th v-if="porductDataList[0].child1.child2.length <= 0" colspan="1" rowspan="1"  style="border-right:none; text-align: center;min-width: 232px">
                    <div class="cell">库存</div>
                  </th>
                  <th v-if="porductDataList[0].child1.child2.length <= 0" colspan="1" rowspan="1" style="border-right:none;text-align: center;">
                    <div class="cell">销量</div></th><th class="gutter" style="width: 0px;">
                  </th>
                </tr>
                </thead>

                <tbody class="" v-if="porductDataList[0] != undefined">
                <tr  v-for="(product, index) in porductDataList" class=" width: 100%;overflow: hidden;">
                  <td v-if="product.child1.name1 != undefined" class="goods-meta" style="padding-right:10px; border-right:1px solid rgb(223, 236, 235);padding-left: 18px;overflow: hidden;min-width:150px;">
                    {{product.child1.name1}} --99--{{index}}
                  </td>
                  <!--第二级开始-->
                <tbody class=""  style="padding-right:10px; padding-left: 18px;overflow: hidden;border-right:1px solid rgb(223, 236, 235);" v-if="porductDataList[0].child1.child2 != undefined" >
                <tr v-for="(child2,index2) in product.child1.child2">
                  <td v-if="porductDataList[0].child1.child2[0].title1 != undefined" :width="child2Width" style="min-width:150px;border-right:1px solid rgb(223, 236, 235);">{{child2.name1}}----{{product.child1.child2[index2].name1}}
                  </td>
                  <!--第三级开始-->
                <tbody  v-for="child3 in child2.child3"  style="padding-right:10px; padding-left: 18px;overflow: hidden;border-right:1px solid rgb(223, 236, 235);" v-if="porductDataList[0].child1.child2[0].child3 != undefined" >
                <tr  style="width: 40%">
                  <td class="child3Width" style="min-width:150px;border-right:1px solid rgb(223, 236, 235);">
                    {{child3.name1}}
                  </td>
                  <td class="" style="border-right:none;  min-width:100px;">
                    <div><el-input v-model="child3.price" placeholder="请输入内容"></el-input></div>
                  </td>
                  <td  class="" style="border-right:none;  min-width:100px;">
                    <div><el-input v-model="child3.quantity" placeholder="请输入内容"></el-input></div>
                  </td>
                  <td  class="" style="border-right:none;  min-width:100px;">
                    <div>123</div>
                  </td>
                </tr>
                </tbody>

                <td v-if="child2.child3.length <=0 " class="" style="border-right:none;  min-width:100px;">
                  <div><el-input v-model="product.child1.child2[index2].price" placeholder="请输入内容"></el-input></div>
                </td>
                <td v-if="child2.child3.length <=0 " class="" style="border-right:none; min-width:100px;">
                  <div><el-input v-model="product.child1.child2[index2].quantity" placeholder="请输入内容"></el-input></div>
                </td>
                <td v-if="child2.child3.length <=0 " class="" style="border-right:none;  min-width:100px;">
                  <div >123</div>
                </td>
                </tr>
                </tbody>
                <!--第二级结束-->
                  <td v-if="product.child1.child2.length <=0 " class="" style="border-right:none;  min-width:100px;">
                    <div><el-input v-model="product.child1.price" placeholder="请输入内容"></el-input></div>
                  </td>
                  <td v-if="product.child1.child2.length <=0 " class="" style="border-right:none;  min-width:100px;">
                    <div><el-input v-model="product.child1.quantity" placeholder="请输入内容"></el-input></div>
                  </td>
                  <td v-if="product.child1.child2.length <=0 " class="" style="border-right:none;  min-width:100px;">
                    <div>123</div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import rq from './../../http/require.js'
  import mBreadcrumb from './../../component/headerTag.vue'
  const productSpecifications = require('../../api/productSpecifications.js')
  export default {
    name: 'commoditySpec',
    data () {
      return {
        //  提示框内容
        pShow: false, // 提示框显示状态
        pMessage: '这里是内容',
        //  数据获取一级菜单
        productSkyType: [],
        productSkyTypeParam: false,

        //  数据库获取规格参数---子参数
        productSkyKey1: [],
        productSkyKey2: [],
        productSkyKey3: [],
        //  总共添加的规格类型行数 数组
        productAddSkyType: [],
        goods_1: '', //  子参数选择时进行判断的标志
        goods_2: '',
        goods_3: '',
        goodsValue_0: '', //  商品规格一级参数值
        goodsValue_1: '',
        goodsValue_2: '',

        addSkuTypeParam: { //  一级规格添加参数
          specName: '',
          varietyId: ''
        },
        //  商品规格 一级参数
        skuKetParam0: {
          value: '',
          specId: ''
        },
        skuKetParam1: {
          value: '',
          specId: ''
        },
        skuKetParam2: {
          value: '',
          specId: ''
        },
        //  商品规格当前操作行数
        productSkyRow: 0,
        //  商品规格参数列表展示
        porductDataListTitle: [{value: ''}, {value: ''}, {value: ''}],
        porductDataList: [],
        porductDataListChildId: '',
        // 商品规格
        specificationsRow: 0, // 商品规格 当前行数
        stockstate: true, //  商品库存是否显示
        nowChild_0: '', //  商品规格添加 输入框内容显示值
        nowChild_1: '',
        nowChild_2: '',

        //  规格选择之后 参数添加框显示与隐藏
        productSkuState1: false,
        productSkuState2: false,
        productSkuState3: false,
        //  规格选择之后 规格参数才可进行添加
        productAddState: false,

        child2length: 0, // 对参数删除时，删除到最后一个时对子集进行判断，如有，让其级别减一
        chiildData: [],
        chiild2Data: [], // 第二级添加 中间变量  每添加都会添加这个
        chiild3Data: [], // 第二级添加 中间变量
        specParams: {
          isRecycled: 1,
          page: 1,
          size: 10
        },
        specificationParams: {
          specId: 1,
          page: 1,
          size: 10
        },
        specAddParams: {
          specName: '尺寸',
          varietyId: 1,
          sortPriority: 2
        },
        param: ''
      }
    },
    methods: {
      //  添加一行
      specificationsAdd: function () {
        if (this.productAddSkyType.length <= 2) {
          this.productAddSkyType.push({
            row: this.productSkyRow,
            parentValue: '',
            nowChild: [],
            tempChild: [],
            value: ''
          })
        }
        if (this.productAddSkyType.nowChild !== '') {
          this.stockstate = true
        }
        for (var i = 0; i < this.productAddSkyType.length; i++) {
          this.productAddSkyType[i].row = i
        }
      },
      // 规格选择 select 选择方法  选择之后为子参数从数据库赋值
      change: function (data, index) {
        console.log(data.value)
        console.log(index)
        let obj = {}
        obj = this.productSkyType.find((item) => {
          return item.specName === data.value
        })
        console.log(obj)
        this.productAddSkyType[index].parentValue = obj
        if (this.productAddSkyType[index].parentValue.specName !== this.goods_1 || this.productAddSkyType[index].parentValue.specName !== this.goods_2 || this.productAddSkyType[index].parentValue.specName !== this.goods_3) { // 判断一级规格是否选择过，选择过之后将子参数重新赋值
          this.productAddSkyType[index].nowChild = []
        }
        var that = this
        var typeState = 0 // 第几个规格可进行选择 进行赋值
        for (var k = 0; k < that.productSkyType.length; k++) {
          if (data.parentValue.specName === that.productSkyType[k].specName) {
            typeState = k
          }
        }
        that.productSkyType[typeState].show = true
        that.specificationsRow = index

        that.specificationParams.specId = obj.id
        //  参数列表
        rq.checkAllSpecParam(that.specificationParams).then(function (data) {
          if (data.result === '成功') {
            console.log(data)
            for (var i = 0; i < data.data.data.length; i++) {
              that.productAddSkyType[index].tempChild.push({id: data.data.data[i].id, value: data.data.data[i].parameter})
            }
            // 每行下面 添加子参数
            that.productAddSkyType[index].parentValue.child = data.data.data // 最大的 选择下面添加子参数
            if (index === 0) {
              for (var i = 0; i < that.productAddSkyType[0].tempChild.length; i++) {
                that.productSkyKey1.push({id: data.data.data[i].id, value: data.data.data[i].parameter}) // 进行 输入框子参数进行选择
              }
            }
            if (index == 1) {
              that.productSkyKey2 = that.productAddSkyType[1].tempChild // 进行 输入框子参数进行选择
            }
            if (index == 2) {
              that.productSkyKey3 = that.productAddSkyType[2].tempChild // 进行 输入框子参数进行选择
            }
          } else if (data.result === '失败') {
            console.log('失败')
          }
        })
      },
      //  一级菜单选择 不需要动
      querySearch1 (queryString, cb) {
        var productSkyKey1 = this.productSkyKey1
        var results = queryString ? productSkyKey1.filter(this.createFilter(queryString)) : productSkyKey1
        cb(results)
      },
      querySearch2 (queryString, cb) {
        var productSkyKey2 = this.productSkyKey2
        var results = queryString ? productSkyKey2.filter(this.createFilter(queryString)) : productSkyKey2
        cb(results)
      },
      querySearch3 (queryString, cb) {
        var productSkyKey3 = this.productSkyKey3
        var results = queryString ? productSkyKey3.filter(this.createFilter(queryString)) : productSkyKey3
        cb(results)
      },
      //  子参数 输入框内容改变
      handleSelect1 (item) {
        console.log(item) // 选择相应规格参数的值和ID
        var nowRow = this.specificationsRow // 当前操作行数
        var childNum = this.productAddSkyType[0].tempChild.length
        var nowChildNum = 0
        var that = this
        //  数据源中进行删除 与对nowChild进行添加
        that.productAddSkyType[0].nowChild.push({
          'created_at': item.created_at, // undefined
          'id': item.id,
          'sku_type_id': item.sku_type_id, // undefined
          'updated_at': item.updated_at, // undefined
          'value': item.value,
          'index': this.handleSelect1Index1 // undefined
        })
        //  选择之后对可以选择的参数进行删除
        for (var i = 0; i < that.productAddSkyType[0].tempChild.length; i++) {
          if (item.value === that.productAddSkyType[0].tempChild[i].value) {
            that.productAddSkyType[0].tempChild.splice(i, 1)
            that.productSkyKey1.splice(i, 1)
          }
        }
        that.nowChild_0 = '' // 商品规格添加 输入框内容显示值
        var keyValeu1 = item.value
        var keyValue = ''
        this.productAddSkyType[0].row = 0
        this.goods_1 = this.productAddSkyType[0].parentValue.name
        this.productSkuState1 = false
        // 判断是否有子参数 如果有则将 数据添加到 子参数列表的数组
        if (childNum >= 0) {
          if (this.porductDataList.length > 0) {
            if (this.porductDataList[0].child1.title1 == undefined) {
              this.porductDataList.splice(0, 1)
            }
            this.porductDataList.push({
              child1: {
                'parentid': this.productAddSkyType[0].parentValue.id,
                'childid': item.id,
                'title1': this.productAddSkyType[0].parentValue.specName,
                'name1': item.value,
                'price': '',
                'quantity': '',
                child2: this.chiild2Data
              }
            })
          } else {
            this.porductDataList.push({
              child1: {
                'parentid': this.productAddSkyType[0].parentValue.id,
                'childid': item.id,
                'title1': this.productAddSkyType[0].parentValue.specName,
                'name1': item.value,
                'price': '',
                'quantity': '',
                child2: this.chiild2Data
              }
            })
          }
        }
      },
      handleSelect2 (item) {
        var nowRow = this.specificationsRow //  当前操作行数
        var childNum = this.productAddSkyType[1].tempChild.length
        // 第二级中间变量 每次都要进行添加 ，然后再循环productDataList 给第一级赋值 （这里也可以通过监听 二级变量是否变，变动之后给第一级循环添加）
        if (this.chiild2Data.length == 1) {
          if (this.chiild2Data[0].title1 == undefined) {
            this.chiild2Data.splice(0, 1)
          }
        }
        this.chiild2Data.push({
          'parentid': this.productAddSkyType[0].parentValue.id,
          'childid': item.id,
          'title1': this.productAddSkyType[1].parentValue.specName,
          'price': '',
          'quantity': '',
          'name1': item.value,
          child3: this.chiild3Data
        })
        //  判断是否有子参数 如果有则将 数据添加到 子参数列表的数组
        if (childNum >= 0) {
          for (var i = 0; i < this.porductDataList.length; i++) {
            this.porductDataList[i].child1.child2 = this.chiild2Data
          }
        }
        var that = this
        //  数据源中进行删除 与对nowChild进行添加
        that.productAddSkyType[1].nowChild.push({
          'created_at': item.created_at,
          'id': item.id,
          'sku_type_id': item.sku_type_id,
          'updated_at': item.updated_at,
          'value': item.value,
          'index': this.handleSelect1Index2
        })
        //  选择之后对可以选择的参数进行删除
        for (var i = 0; i < that.productAddSkyType[1].tempChild.length; i++) {
          if (item.value == that.productAddSkyType[1].tempChild[i].value) {
            that.productAddSkyType[1].tempChild.splice(i, 1)
            that.productSkyKey2.splice(i, 1)
          }
        }
        that.nowChild_1 = '' // 商品规格添加 输入框内容显示值
        var keyValeu1 = item.value
        var keyValue = ''
        this.productAddSkyType[1].row = 1
        this.goods_2 = this.productAddSkyType[1].parentValue.name
        this.productSkuState2 = false
      },
      handleSelect3 (item) {
        var nowRow = this.specificationsRow // 当前操作行数
        var childNum = this.productAddSkyType[2].tempChild.length
        // 第三级中间变量 每次都要进行添加 ，然后再循环productDataList 给第二级赋值（这里也可以通过监听 三级变量是否变，变动之后给第一级 和 第二级 循环添加）
        this.chiild3Data.push({
          'parentid': this.productAddSkyType[0].parentValue.id,
          'childid': item.id,
          'title1': this.productAddSkyType[2].parentValue.specName,
          'price': '',
          'quantity': '',
          'name1': item.value
        })
        // 判断是否有子参数 如果有则将 数据添加到 子参数列表的数组
        if (childNum >= 0) {
          for (var i = 0; i < this.porductDataList.length; i++) {
            for (var j = 0; j < this.porductDataList[i].child1.child2.length; j++) {
              this.porductDataList[i].child1.child2[j].child3 = this.chiild3Data
            }
          }
        }
        var that = this
        //  数据源中进行删除 与对nowChild进行添加
        that.productAddSkyType[2].nowChild.push({
          'created_at': item.created_at,
          'id': item.id,
          'sku_type_id': item.sku_type_id,
          'updated_at': item.updated_at,
          'value': item.value,
          'index': this.handleSelect1Index3
        })
        //  选择之后对可以选择的参数进行删除
        for (var i = 0; i < that.productAddSkyType[2].tempChild.length; i++) {
          if (item.value == that.productAddSkyType[2].tempChild[i].value) {
            that.productAddSkyType[2].tempChild.splice(i, 1)
            that.productSkyKey2.splice(i, 1)
          }
        }
        that.nowChild_2 = '' // 商品规格添加 输入框内容显示值
        var keyValeu1 = item.value
        var keyValue = ''
        this.productAddSkyType[2].row = 0
        this.goods_3 = this.productAddSkyType[2].parentValue.name
        this.productSkuState3 = false
      },
      //  规格选择之后 规格参数选择框出现
      productSkuState: function (index) {
        if (index == 0) {
          this.productSkuState1 = true
        }
        if (index == 1) {
          this.productSkuState2 = true
        }
        if (index == 2) {
          this.productSkuState3 = true
        }
      }
    },
    mounted () {
      var that = this
      that.productAddSkyType.tempChild = []
      rq.searchAllSpec(that.specParams).then(function (data) {
        if (data.result === '成功') {
          console.log(data)
          that.productSkyType = data.data.data
        } else if (data.result === '失败') {
          that.productSkyType = []
        }
      })
    },
    components: {
      mBreadcrumb
    },
    computed: {
      stockstate: function () {
        if (this.porductDataList.length <= 0) {
          this.stockstate = false
        } else {
          this.stockstate = true
        }
        console.log(this.stockstate)
        return this.stockstate
      }
    }
  }
</script>
<!-- 引入 commodityVariety Scss 文件  -->
<style lang="scss" scoped>@import "scss/commodityExample";</style>
