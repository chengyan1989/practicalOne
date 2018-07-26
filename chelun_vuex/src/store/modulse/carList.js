import { carListclick } from "../../api/index";
const state = {
    masterList: [], //侧边栏汽车品牌列表
    masterIsShow: "", //是否显示汽车品牌列表,
}
const mutations = {
    masterList: (state, payload) => {
        state.masterList = payload.masterList;
    },
    masterIsShow: (state, payload) => {
        console.log(payload);
        state.masterIsShow = payload.active;
    }
}
const actions = {
    carListClick(context, payload) {
        carListclick(payload).then(res => {
            res.json().then(body => {
                if (body.code == 1) {
                    context.commit("masterList", { masterList: body.data });
                    context.commit("masterIsShow", { active: "active" })
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