import Vue from "vue";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);
import list from "./modules/list";
export default new Vuex.Store({
    modules: {
        list
    },
    plugins: [createLogger()]
})