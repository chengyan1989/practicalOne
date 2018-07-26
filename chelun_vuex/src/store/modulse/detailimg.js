import { imgDetail } from "../../api/index";
const state = {
    imgList: [],
    pageNum: 0
};
const mutations = {
    getImgList: (state, payload) => {
        state.imgList = state.imgList.concat(payload)
    },
    getPageNum: (state) => {
        state.pageNum++;
    }
}
const actions = {
    getDate(context, { picid, imgid, cb }) {
        context.commit("getPageNum")
        imgDetail(picid, imgid, context.state.pageNum).then(res => {
            res.json().then(body => {
                if (body.code == 1) {
                    body.data.List.forEach((item, index) => {
                        item.Url = item.Url.replace("{0}", 3);
                    });
                    context.commit("getImgList", body.data.List)
                }
                cb && cb();
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