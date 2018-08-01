import Vuex from "vuex";
import Vue from "vue";
import createLogger from 'vuex/dist/logger';
import home from "./modulse/home";
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        home
    },
    plugins: [createLogger()]
})