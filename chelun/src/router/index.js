import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import CarDetail from "@/components/CarDetail";
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'Index',
            component: Index,
        },
        {
            path: '/cardetail',
            name: 'CarDetail',
            component: CarDetail,
        }
    ]
})