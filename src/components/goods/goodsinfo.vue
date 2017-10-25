<template>
    <div class="tmpl">
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>

        <!-- 商品详情 -->
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in imgList" :key="item.id">
                                                    <div class="small-img">`
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--/商品图片-->

                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1 v-text="ginfo.title"></h1>
                                <p class="subtitle" v-html="ginfo.zhaiyao">
                                    <div class="spec-box">
                                        <dl>
                                            <dt>货号</dt>
                                            <dd id="commodityGoodsNo" v-text="ginfo.goods_no"></dd>
                                        </dl>
                                        <dl>
                                            <dt>市场价</dt>
                                            <dd>
                                                <s id="commodityMarketPrice" v-text="ginfo.market_price"></s>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dt>销售价</dt>
                                            <dd>
                                                <em class="price" id="commoditySellPrice" v-text="ginfo.sell_price"></em>
                                            </dd>
                                        </dl>
                                    </div>

                                    <div class="spec-box">
                                        <dl>
                                            <dt>购买数量</dt>
                                            <dd>
                                                <div class="stock-box">
                                                    <el-input-number v-model="buyCount" :min="1"></el-input-number>
                                                </div>
                                                <span class="stock-txt">
                                                    库存
                                                    <em id="commodityStockNum">10</em>件
                                                </span>
                                            </dd>
                                        </dl>
                                        <dl>
                                            <dd>
                                                <div class="btn-buy" id="buyButton">
                                                    <button class="buy" onclick="cartAdd(this,'/',1,'/shopping.html');">立即购买</button>
                                                    <button class="add" @click="cartAdd(buyCount)">加入购物车</button>
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click='getSelected(true)'>
                                            <a v-bind="{class: isSelected? 'selected':''}" href="javascript:;">商品介绍</a>
                                        </li>
                                        <li @click='getSelected(false)'>
                                            <a href="javascript:;" v-bind="{class: !isSelected? 'selected':''}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="entry" v-html="ginfo.content" v-if="isSelected">
                                内容
                            </div>

                            <div v-if="!isSelected">
                                <!--网友评论-->
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model="commentTxt" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input type="button" value="提交评论" class="submit" @click="postComment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentList.length<=0" style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="item in commentList" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span v-text="item.user_name"></span>
                                                    <span>{{item.add_time|datafmt("YYYY-MM-DD hh:mm:ss")}}</span>
                                                </div>
                                                <p v-text="item.content"></p>
                                            </div>
                                        </li>

                                    </ul>
                                    <!--放置页码-->
                                    <el-pagination @size-change="pageSizeChange" @current-change="pageIndexChange" :current-page="pageIndex" :page-sizes="[5,10, 20, 30, 50]"
                                        :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
                                    </el-pagination>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">

                                    <li v-for="item in hotgoodslist " :key="item.id">
                                        <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                            <div class="img-box">
                                                <a href="/goods/show-98.html">
                                                    <img :src="item.img_url">
                                                </a>
                                            </div>
                                            <div class="txt-box">
                                                <a href="/goods/show-98.html" v-text="item.title"></a>
                                                <span>{{item.add_time| datafmt('YYYY-MM-DD hh:mm:ss')}}</span>
                                            </div>
                                        </router-link>
                                    </li>


                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Affix from 'iview/src/components/affix';
    // 导入jquery插件
    import "../../../static/site/js/jqplugins/imgzoom/magnifier.js"


    import { setItem } from "../../../static/kits/localstorageKit.js"

    export default {
        components: {
            Affix
        },
        data() {
            return {
                ginfo: {},
                imgList: [],
                hotgoodslist: [],
                isSelected: true,
                pageIndex: 1,
                pageSize: 5,
                totalCount: 0,
                commentList: [],
                commentTxt: "",
                buyCount: 0//购买数量
            }
        },
        created() {
            this.getInfo();
            this.getComment();
        },
        watch: {
            "$route": function () {
                this.getInfo();
            }
        },
        methods: {
            cartAdd() {
                //设置全局状态里面的buycount
                // this.$store.state.buycount += buycount;
                this.$store.dispatch("changeBuyCount",this.buyCount);
                //重新存到state中
                //{'gid':'88','bcount':'1'}

                // if(this.ginfo.id){
                //     this.$store.state.ids.push(this.ginfo.id)
                // }
                setItem({"gid":this.$route.params.goodsid,"bcount":this.buyCount});
                // console.log(this.buyCount)
            },
            postComment() {
                //提交评论
                if (this.commentTxt.length <= 0) {
                    this.$message.error("必须填写评论信息")
                    return;
                }
                var goodsid = this.$route.params.goodsid;
                this.$http.post("/site/validate/comment/post/goods/" + goodsid, { "commenttxt": this.commentTxt })
                    .then(res => {
                        if (res.data.status == 1) {
                            this.$message.error(res.data.message);
                            return;
                        }
                        this.commentTxt = "";
                        this.pageIndex = 1;
                        this.getComment()
                    })

            },
            pageIndexChange(val) {
                this.pageIndex = val;
                this.getComment()

            },
            pageSizeChange(val) {
                this.pageSize = val;
                this.getComment()

            },
            getSelected(selected) {
                this.isSelected = selected
            },
            getComment() {
                //获取id号
                var goodsid = this.$route.params.goodsid;
                // console.log(goodsid)
                this.$http.get("/site/comment/getbypage/goods/" + goodsid + "?pageIndex=" + this.pageIndex + "&pageSize=" + this.pageSize)
                    .then(res => {
                        this.commentList = res.data.message;
                        this.totalCount = res.data.totalcount;

                    })
            },
            getInfo() {
                //获取id号
                var goodsid = this.$route.params.goodsid
                this.$http.get("/site/goods/getgoodsinfo/" + goodsid).then(res => {
                    this.ginfo = res.data.message.goodsinfo;
                    this.imgList = res.data.message.imglist;
                    this.hotgoodslist = res.data.message.hotgoodslist;
                    setTimeout(function () {
                        $(function () {
                            $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
                        });
                    }, 100)
                })
            }
        }
    }
</script>
<style scoped>
    @import url("../../../static/site/js/jqplugins/imgzoom/css/magnifier.css");
</style>