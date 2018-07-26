import Vue from "vue";
import Vuex from "vuex";
import todolist from "./modules/todolist";
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex);
export default new Vuex.Store({
    modules: {
        todolist
    },
    plugins: [createLogger()]
})