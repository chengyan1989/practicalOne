import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from "element-ui";
Vue.config.productionTip = false;
import 'element-ui/lib/theme-chalk/index.css';
// import "rest-css";
Vue.use(ElementUI)
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})