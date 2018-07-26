import { carDetail } from "../../api/index";
const state = {
    detailList: "",
    idNum: "", //ID号
    carYear: [], //年份
    carInfoList: [], //每年的车信息
    isActive: 0,
    indexCarIfo: [], //点击时候的数据
}
const mutations = {
    getList: (state, payload) => {
        state.detailList = payload
    },
    getIdNum: (state, payload) => {
        state.idNum = payload;
    },
    getcarYear: (state, payload) => {
        state.carYear = payload;
    },
    getcarInfoList: (state, payload) => {
        state.carInfoList = payload;
    },
    getisActive: (state, payload) => {
        state.isActive = payload;
    },
    getindexCarIfo: (state, payload) => {
        state.indexCarIfo = payload;
    },
}
const actions = {
    getDetailData(context, payload) {
        context.commit("getIdNum", payload);
        carDetail(payload).then(res => {
            res.json().then(body => {
                context.commit("getList", body.data); //全部数据
                //处理全部、2017、2018的数据
                let list = state.detailList.list;
                let yearArr = ["全部"]; //车系的年份
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
                carInfoList.unshift({
                    year: "全部",
                    list: list
                });
                context.commit("getcarYear", yearArr); //年份
                //分装排序方法
                let sortCarlist = (arr) => {
                    return arr.sort((a, b) => {
                        if (a.exhaust < b.exhaust) {
                            return -1;
                        } else if (a.exhaust > b.exhaust) {
                            return 1;
                        } else {
                            if (a.msx_power < b.max_power) {
                                return -1;
                            } else if (a.msx_power > b.max_power) {
                                return 1;
                            } else {
                                return b.inhale_type - a.inhale_type;
                            }
                        }
                    })
                };
                //调用排序
                carInfoList.forEach(item => {
                    sortCarlist(item.list);
                })
                context.commit("getcarInfoList", carInfoList) //所有数据  一个数组
                context.dispatch("infoClick", { item: "全部", index: 0 })

            })
        })
    },
    infoClick(context, payload) {
        context.commit("getisActive", payload.index)
        state.carInfoList.forEach((val, index) => {
            if (payload.item == val.year) {
                context.commit("getindexCarIfo", val.list)
            }
        })
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}