<template>
  <div id="header" class="header">
    <div class="head-top">
      <div class="section">
        <div class="left-box">
          <span>vue2.0单页应用</span>
          <a target="_blank" href="#"></a>
          <a target="_blank" href="#"></a>
        </div>
        <div id="menu" class="right-box">
          <a href="/login.html">登录</a>
          <a href="/register.html">注册</a>
          <strong>|</strong>
            <router-link to="/site/cart">
                <i class="iconfont icon-cart"></i>购物车(
                <span id="shoppingCartCount">
                  {{this.$store.getters.getCount}}
                </span>)
          </router-link>
        </div>
      </div>
    </div>
    <div class="head-nav">
      <div class="section">
          <!-- <div class="logo">
                           <a href="/index.html"><img width="230px" height="70px" src="/templates/main/images/logo.png" /></a>
                       </div>-->
        <div id="menu2" class="nav-box menuhd">
          <ul>
            <li class="index">
              <a href="/index.html">
                首页
              </a>
            </li>
            <li class="news">
              <a href="/news.html">
                学员问题汇总
              </a>
            </li>
            <li class="photo">
              <a href="/photo.html">
                重难点专区
              </a>
            </li>
            <!--<li class="goods"><a href="">就业阶段</a></li>-->
            <li class="video">
              <a href="/video.html">
                前端常用功能
              </a>
            </li>
            <li class="down">
              <a href="/down.html">
                资源下载
              </a>
            </li>
            <li>
              <router-link to="/site/goodslist">
                <a target="_blank" href="#">
                  购物商城
                </a>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="search-box">
          <div class="input-box">
            <input id="keywords" name="keywords" type="text" onkeydown="if(event.keyCode==13){SiteSearch('/search.html', '#keywords');return false};"
              placeholder="输入关健字" x-webkit-speech="">
          </div>
          <a href="javascript:;" onclick="SiteSearch('/search.html', '#keywords');">
            <i class="iconfont icon-search"></i>
          </a>
        </div>
      </div>
    </div>
    <!-- 2.0 路由的占位符 -->
    <router-view></router-view>
  </div>


</template>

<script>
  $(document).ready(function () {
    $("#menu2 li a").wrapInner('<span class="out"></span>');
    $("#menu2 li a").each(function () {
      $('<span class="over">' + $(this).text() + '</span>').appendTo(this);
    });

    $("#menu2 li a").hover(function () {
      $(".out", this).stop().animate({ 'top': '48px' }, 300); // move down - hide
      $(".over", this).stop().animate({ 'top': '0px' }, 300); // move down - show

    }, function () {
      $(".out", this).stop().animate({ 'top': '0px' }, 300); // move up - show
      $(".over", this).stop().animate({ 'top': '-48px' }, 300); // move up - hide
    });

  });


  export default {

    data() {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  @import url('../../static/elementuiCss/index.css');
</style>