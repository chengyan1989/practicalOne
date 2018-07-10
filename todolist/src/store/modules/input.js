const state = {
    input: '111'
}

const mutations = {
    changeInput: (state, { input }) => {
        state.input = input
    }
}


export default {
    state,
    mutations
}