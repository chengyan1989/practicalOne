import Vuex from "vuex";
import Vue from "vue";
import index from "./modulse/index";
import carList from "./modulse/carList";
import cardetail from "./modulse/cardetail";
import createLogger from 'vuex/dist/logger';
import carquotation from "./modulse/carquotation";
import caryearType from "./modulse/caryearType";
import pic from "./modulse/pic";
import detailimg from "./modulse/detailimg";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        index,
        carList,
        cardetail,
        carquotation,
        caryearType,
        pic,
        detailimg
    },
    plugins: [createLogger()]
})