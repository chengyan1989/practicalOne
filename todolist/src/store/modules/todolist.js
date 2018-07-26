const state = {
    val: "",
    list: [{
        text: "待办事项1",
        finish: false //false 表示没有完成
    }, {
        text: "待办事项2",
        finish: true //true 表示完成
    }],
    finished: [],
    unfinished: []
}

const mutations = {
    changeInput: (state, payload) => { //获取input的值
        state.val = payload
    },
    listchange: (state, payload) => { //改变list的值
        if (!payload) {
            alert("您输入的内容为空");
            return
        } else {
            state.list.push({
                text: payload,
                finish: false
            });
        }
    },
    filters: (state) => { //过滤全部数据，分出已完成和未完成。
        state.finished = state.list.filter((item) => {
            if (item.finish) {
                return item;
            }
        });
        state.unfinished = state.list.filter((item) => {
            if (!item.finish) {
                return item;
            }
        })
    }
}
const actions = {
    click(context, payload) {
        context.commit("listchange", payload)
        context.commit("filters")
    }
}
export default {
    state,
    mutations,
    actions
}