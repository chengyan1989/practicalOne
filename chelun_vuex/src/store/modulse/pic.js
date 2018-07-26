import { getpic } from "../../api/index";
const state = {
    imgList: []
}
const mutations = {
    getImgList: (state, payload) => {
        state.imgList = payload;
    }
}
const actions = {
    getImgList(context, payload) {
        getpic(payload).then(res => {
            res.json().then(body => {
                if (body.code == 1) {
                    let picArr = [];
                    body.data.forEach((item, index) => {

                        item.List.forEach((val, key) => {
                            val.Url = val.Url.replace("{0}", key + 1)
                            if (key == 0) {
                                picArr.push({
                                    id: item.Id,
                                    name: item.Name,
                                    count: item.Count,
                                    url: val.Url
                                })
                            } else {
                                picArr.push({
                                    id: item.Id,
                                    name: item.Name,
                                    url: val.Url
                                })
                            }
                        })
                    });
                    context.commit("getImgList", picArr)
                } else {
                    alert(body.msg)
                }
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