const state = {
    time: "2018年7月19日"
}
const mutations = { //同步
    // upTime: (state, newstate) => {不解构的方式
    //     state.time = newstate.time
    // }
    upTime: (state, { time }) => { //解构的方式
        state.time = time
    }
}
const actions = {
    upTime: (context, payload) => { //context指向当前的store
        context.commit({
            type: "upTime",
            ...payload
        })
    }
}
export default {
    state,
    mutations,
    actions
}