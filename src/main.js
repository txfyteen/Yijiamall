//导入vue
import Vue from "vue";

import App from "./App.vue";

//导入vue-router
import vueRouter from "vue-router";
//将vue-router绑定到vue
Vue.use(vueRouter);

//1.0.3定义路由规则
import layout from "./components/layout.vue";
import goodslist from "./components/goods/goodslist.vue";
import goodsinfo from "./components/goods/goodsinfo.vue";
import cart from "./components/goods/cart.vue";
var router = new vueRouter({
    routes: [
        { name: "default", path: "/", redirect: "/site" },
        {
            name: "layout",
            path: "/site",
            component: layout,
            children: [
                { name: "goodslist", path: "goodslist", component: goodslist },
                { name: "goodsinfo", path: "goodsinfo/:goodsid", component: goodsinfo },
                { name: "cart", path: "cart", component: cart },
            ]
        }
    ]
});




//2.0 axios
//2.0.1导入包
import axios from "axios";
//2.0.2配置基本url
axios.defaults.baseURL = "http://157.122.54.189:9095";
// Vue.use(axios);
Vue.prototype.$http = axios;






//3.0 使用elementUI

import elementUI from "element-ui";
// // import "element-ui/lib/theme-default/index.css"


//自己的CSS样式
// import "../statics/theme_rms/index.css";
// import "../statics/css/base.css";
import "../static//site//css/style.css"

Vue.use(elementUI);


//4.0 使vuex
import vuex from "vuex"
Vue.use(vuex);

// //4.1 生命一个state存储全局状态
var state = {
    //购买商品种类的个数
    buycount: 0,
}

var actions = {
    changeBuyCount({ commit }, buycount) {
        commit('changeBuyCount', buycount);
    }
}

var mutations = {
    changeBuyCount(state, buycount) {
        state.buycount = buycount;
    }
}

import { getItem } from '../static/kits/localstorageKit.js'
var getters = {
    // ///site/comment/getshopcargoods/:ids
    getCount(state) {
        if (state.buyCount > 0) {
            return state.buycount;
        }
        //读取localstorage中的数据商品种类个数返回
        var goodsObj = getItem();
        var count = 0;
        for (var key in goodsObj){
            count ++ ;
        }
        state.buycount = count;
        return state.buycount;
    }



}


//实例化store对象
var store = new vuex.Store({
    state,
    mutations,
    actions,
    getters
})









//配置公有过滤器
Vue.filter('datafmt', function (input, fmtstring) {
    // 返回处理后的值
    var date = new Date(input);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var mm = date.getMinutes();
    var s = date.getSeconds();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }
    if (h < 10) {
        h = '0' + h;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    if (s < 10) {
        s = '0' + s;
    }
    if (fmtstring == 'YYYY-MM-DD') {
        return y + '-' + m + '-' + d;
    }
    if (fmtstring == 'YYYY-MM-DD hh:mm:ss') {
        return y + '年' + m + '月' + d + '日 ' + h + ':' + mm
    }
})








new Vue({
    el: "#app",
    router,
    store,
    //将App当做根组件替换html里面的div
    render: create => create(App)

})