import Vue from 'vue'
import App from './App'
import store from "./store/store.config";
import "./scss/reset.scss";
Vue.config.productionTip = false
new Vue({
    el: '#app',
    components: { App },
    store,
    template: '<App/>'
})