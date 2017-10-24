<template>
    <div class="tmpl">
        <!-- 面包屑 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>
        <!-- 商品首屏 -->

        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="(item,index) in ginfo.catelist" :key="index">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(subcates,index) in item.subcates" :key="index">{{subcates.title}} &nbsp;</span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html" v-for="subitem in item.subcates">{{subitem.title}}</a>

                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box ">
                                <!-- 利用elementUI的走马灯组件进行替换 -->

                                <el-carousel :interval="5000" arrow="always">
                                    <!-- el-carousel-item 代表每一页 -->
                                    <el-carousel-item v-for="(item,index) in ginfo.sliderlist" :key="index">
                                        <img height="400" :src="item.img_url" alt="">
                                        <h3>{{ item.title }}</h3>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in ginfo.toplist">
                                <div class="img-box">
                                    <label>1</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | datafmt("YYYY-MM-DD hh:mm:ss")}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--/推荐商品-->
                </div>
            </div>
        </div>

        <!-- 分类商品列表 -->
        <div class="section" v-for="(item,index) in catelist" :key="index">

            <!--子类-->
            <div class="main-tit">
                <h2 v-text="item.catetitle"></h2>
                <p>
                    <a href="/goods/43.html" v-for="(level2catelist,index) in item.level2catelist" :key="index" v-text="level2catelist.subcatetitle">手机通讯</a>

                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">

                        <li v-for="datas in item.datas" :key="datas.artID">
                            <a href="/goods/show-91.html">
                                <div class="img-box">
                                    <img :src="datas.img_url">
                                </div>
                                <div class="info">
                                    <h3 v-text="datas.artTitle"></h3>
                                    <p class="price">
                                        <b>{{datas.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{datas.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s v-text="datas.market_price"></s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    export default {
        data() {
            return {
                ginfo: {},
                catelist: {}
            }
        },
        created() {
            this.getlist();
            this.getcatelist();
        },
        methods: {
            getcatelist() {
                this.$http("/site/goods/getgoodsgroup").then(res => {
                    this.catelist = res.data.message;
                    console.log(this.catelist)
                })
            },
            getlist() {
                this.$http("/site/goods/gettopdata/goods").then(res => {
                    this.ginfo = res.data.message;
                })
            }
        }
    }
</script>
<style scoped>
    .el-carousel__container {
        height: 343px;
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 50px;
        margin: 0;
    }

    /* 
    .el-carousel__item h3 {
     color: #475669;
     font-size: 18px;
     opacity: 0.75;
     line-height: 50px;
     margin: 0;
   } */
</style>