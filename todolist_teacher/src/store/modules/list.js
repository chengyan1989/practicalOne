const state = {
    val: "",
    type: "all", //默认显示全部数据
    list: [{
        text: "待办事项1",
        finish: true //表示已经完成
    }, {
        text: "待办事项2",
        finish: false //表示未完成
    }, {
        text: "待办事项3",
        finish: false //表示未完成
    }],
}
const mutations = {
    chageInput: (state, payload) => {
        console.log(payload.target.value);
        state.val = payload.target.value
    },
    addList: (state, payload) => {
        state.list.push({
            text: payload,
            finish: false
        })
    },
    finish: (state, payload) => {
        state.list.forEach((item, index) => {
            if (item === payload) {
                item.finish = !item.finish;
            }
        })
    },
    changeType: (state, payload) => {
        state.type = payload;
    }
}
export default {
    state,
    mutations
}