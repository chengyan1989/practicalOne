import { getcarData } from "../../api/index";
const state = {
    Letter: [], //导航的26个字母
    CarList: [], //首页车型列表
    loadFlag: true, //是否显示loading画面
}
const mutations = {
    getcarlist: (state, { carlist }) => {
        state.CarList = carlist;
    },
    getLetter: (state, { letter }) => {
        state.Letter = letter
    },
    loadFlag: (state, { flag }) => {
        state.loadFlag = flag
    }
}
const actions = {
    //获取汽车列表和右侧目录列表
    getData(context) {
        getcarData().then(res => {
            res.json().then(body => {
                let data = body.data;
                var letter = []; //放26个字母
                var carlist = []; //车型
                data.forEach(function(val, ind) {
                    // console.log(val);
                    let keyword = val.Spelling.slice(0, 1);
                    if (letter.indexOf(keyword) == -1) {
                        letter.push(keyword);
                        carlist.push({
                            letter: keyword,
                            list: [val]
                        })
                    } else {
                        carlist.forEach(function(item, key) {
                            if (keyword == item.letter) {
                                item.list.push(val);
                            }
                        });
                    }
                });
                letter.unshift("#");
                context.commit("getcarlist", { carlist })
                context.commit("getLetter", { letter })
                context.commit("loadFlag", { flag: false });
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