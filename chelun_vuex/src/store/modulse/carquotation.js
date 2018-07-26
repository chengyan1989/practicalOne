import { carquotationadd, carquotation } from "../../api/index";
const state = {
    CityID: "201",
    data: []
}
const mutations = {
    getCityID: (state, payload) => {
        state.CityID = payload;
    },
    getdata: (state, payload) => {
        state.data = payload;
    },
}
const actions = {
    getData(context, payload) {
        //定位地址请求
        carquotationadd().then(res => {
            res.json().then(body => {
                context.commit("getCityID", body.data.CityID)
            })
        });
        //请求数据的地址
        carquotation(payload, state.CityID).then(res => {
            res.json().then(body => {
                context.commit("getdata", body.data)
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