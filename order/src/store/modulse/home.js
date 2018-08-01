import { hotCity, allCity } from "../../serverUrl/index.js";
import carList from "../../../../chelun_vuex/src/store/modulse/carList.js";
let state = {
    cityName: "",
    hotCity: [],
    cityList: {},
    isloading: true
}
let mutations = {
    getcityname: (state) => {
        let cityname = returnCitySN.cname;
        if (!cityname) {
            state.cityName = "抱歉无法定位，请手动选择您当前所在的城市";
        } else {
            state.cityName = cityname
        }
    },
    getHotCity: (state, payload) => { //热门城市列表
        state.hotCity = payload;
    },
    getAllCity: (state, payload) => { //所有城市列表
        //遍历城市列表的对象
        let cityList = []
        Object.keys(payload).forEach(function(key) { //key 为每行首字母
            let city = {};
            city.letter = key;
            city.payload = payload[key];
            if (cityList.indexOf(city) == -1) {
                cityList.push(city);
            }
        });
        cityList.sort(function(a, b) { return a.letter.toString().localeCompare(b.letter) })
        state.cityList = cityList;
        state.isloading = false;
    }
}
let actions = {
    getHotData(context, payload) {
        hotCity().then(res => {
            res.json().then(body => {
                context.commit("getHotCity", false);
            })
        });
    },
    getAllData(context, payload) {
        allCity().then(res => {
            res.json().then(body => {
                context.commit("getAllCity", body)
            })
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}