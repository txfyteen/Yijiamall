<template>
    <div class="myCart">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-switch v-model="isselectedAll" on-color="#1F2D3D" on-text="反选" off-text="全选" @change="isSelectedAlla"></el-switch>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="goodsList.length<=0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item,index) in goodsList" :key="item.id" class="goodslisttable">
                                    <td>
                                        <el-switch v-model="values[index]" on-color="#1F2D3D" on-text="取消" off-text="选择" @change="isSelected">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">{{item.title}}</td>
                                    <td width="84">{{item.sell_price}}</td>
                                    <td width="120" align="center">
                                       <myinput @update="update" :options="{gid:item.id,count:item.buycount}"></myinput>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price*item.buycount}}</td>
                                    <td width="54" align="center">
                                        <el-button type="success" @click="removeGoods(item.id)">删除</el-button>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{buyGoodsCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { getItem,removeItem } from "../../../static/kits/localstorageKit.js"
    //引入子组件
    import myinput from "../kitcomp/numComputed.vue"
    export default {
        components:{
            myinput
        },
        data() {
            return {
                goodsList: [],
                values: [],
                isselectedAll: false,
                buyGoodsCount: 0,//所有商品总数
            }
        },
        created() {
            this.getList();

        },
        computed: {
            //计算商品的总数
            getPrice(){
                var trueArr = this.values.filter(item=>{

                    return item;
                    
                })
                this.buyGoodsCount = trueArr.length

                var goodsAllPrice = 0
                //计算商品总价
                var _this = this
                this.values.forEach(function(element,index,array){
                    if(element == true){
                        var goodsinfo = _this.goodsList[index]
                        goodsAllPrice+=goodsinfo.sell_price*goodsinfo.buycount
                    }
                })
                return goodsAllPrice
            }   
        },
        methods: {
            removeGoods(id){
                var index = -1
                index = this.goodsList.findIndex(item=>{item.id == id})

                this.goodsList.splice(index,1);
                this.values.splice(index,1)
                removeItem(id)
                this.getList();
            },
            update(obj){
                this.goodsList.forEach((item,index)=>{
                    if(item.id == obj.gid){
                        item.buycount = obj.count;
                    }
                }) 
                this.goodsList.push("");
                this.goodsList.pop();
            },
            isSelected() {
                for (var i = 0; i < this.values.length; i++) {
                    if (this.values[i] == false) {
                        this.isselectedAll = false;
                    }
                }
               
            },
            //全选按钮
            isSelectedAlla() {
                // console.log('isSelectedAlla')
                for (var i = 0; i < this.values.length; i++) {
                    if (this.isselectedAll == true) {
                        this.values[i] = true;
                    } else if (this.isselectedAll == false) {
                        this.values[i] = false;
                    }
                }
                this.values.push("false")
                this.values.pop();

            },
            getList() {
                var goodsObj = getItem();
                var idsArr = []
                for (var key in goodsObj) {
                    idsArr.push(key);
                }
                var ids = idsArr.join(",")
                this.$http.get("/site/comment/getshopcargoods/" + ids)
                    .then(res => {
                        this.goodsList = res.data.message
                        //根据返回的数组个数初始化values数组的个数
                        this.goodsList.forEach((item, index) => {
                            this.values.push(false);
                            item.buycount = goodsObj[item.id]
                        })
                    })
            }
        }
    }
</script>
<style>
    .goodslisttable td {
        /* text-align: center; */
    }

    .cart-foot .right-box .button {
        background-color: #13CE66;
    }

    .cart-foot .right-box .submit {
        background-color: #FF4949;
    }
</style>