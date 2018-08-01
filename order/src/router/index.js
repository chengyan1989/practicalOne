import Vue from 'vue'
import Router from 'vue-router'
import Home from '../page/Home.vue';
import City from "../page/City.vue";
import Login from "../page/Lgoin.vue";
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: "/home"
        }, {
            path: "/home", //首页城市
            component: Home
        },
        {
            path: '/city:id', //当前选择城市页
            component: City
        },
        {
            path: "/login", //登录页面
            component: Login
        }
    ]
})