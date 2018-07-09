import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import CarDetail from "@/components/CarDetail";
import Pic from "@/components/Pic";
import Detailimg from "@/components/Detailimg";
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
        },
        {
            path: '/carpic',
            name: 'Pic',
            component: Pic
        }, {
            path: "/detailimg",
            name: "Detailimg",
            component: Detailimg
        }
    ]
})