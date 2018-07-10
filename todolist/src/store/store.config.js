import Vue from "vue";
import Vuex from "vuex";
import input from "./modules/input";
import list from "./modules/list";
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        input,
        list
    },
    plugins: [createLogger()]
})