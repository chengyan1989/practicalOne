import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/Login'; //登录页面
import Content from "@/components/content/Content"; //内容页面
import Admin from "@/components/content/Admin"; //管理员
import Report from "@/components/content/Report"; //成绩单
import Modify from "@/components/content/Modify"; //修改成绩单
import Query from "@/components/content/Query"; //查看综合积分
import Checkin from "@/components/content/Checkin"; //点名
import Delete from "@/components/content/Delete"; //删除学生
Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        redirect: '/content/report'
    }, {
        path: '/content',
        name: 'Content',
        component: Content,
        children: [{
                path: "/content/admin", //分配权限
                component: Admin
            },
            {
                path: "/content/report", //查看成绩单
                component: Report
            },
            {
                path: "/content/modify", //修改成绩单
                component: Modify
            },
            {
                path: "/content/query", //查看综合计分
                component: Query
            },
            {
                path: "/content/checkin", //点名
                component: Checkin
            },
            {
                path: "/content/delete", //删除学生
                component: Delete
            }
        ]
    }, {
        path: '/login',
        name: 'Login',
        component: Login
    }]
})