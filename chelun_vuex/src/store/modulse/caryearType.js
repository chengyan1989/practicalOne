import { carDetail } from "../../api/index";
const state = {
    yearlist: "", //全部数据
    carYear: [], //年份
    carInfoList: [], //每年的车信息
    isActive: 0
}
const mutations = {
    getyearlist: (state, payload) => {
        state.yearlist = payload
    },
    getcarYear: (state, payload) => {
        state.carYear = payload;
    },
    getcarInfoList: (state, payload) => {
        state.carInfoList = payload;
    },
    getisActive: (state, payload) => {
        state.isActive = payload;
    }
}
const actions = {
    getData(context, { id }) {
        carDetail(id).then(res => {
            res.json().then(body => {
                if (body.code == 1) {
                    //处理全部、2017、2018的数据
                    let list = body.data.list;
                    let yearArr = []; //车系的年份
                    let carInfoList = []; //每年的车信息
                    list.forEach((item, index) => {
                        let year = item.market_attribute.year;
                        if (yearArr.indexOf(year) == -1) {
                            yearArr.push(year);
                            carInfoList.push({
                                year,
                                list: [item]
                            })
                        } else {
                            carInfoList.forEach(function(val, index) {
                                if (year == val.year) {
                                    val.list.push(item);
                                }
                            });
                        }
                    });
                    context.commit("getcarInfoList", carInfoList); //每年的数据
                    context.commit("getcarYear", yearArr); //年份
                    context.dispatch("getyearList", { item: "2018", index: 0 })
                } else {
                    alert(body.msg);
                }
            })
        })
    },
    getyearList(context, payload) {
        context.commit("getisActive", payload.index);
        state.carInfoList.forEach(item => {
            if (item.year == payload.item) {
                context.commit("getyearlist", item.list)
                console.log(item.list);
            }
        })
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}