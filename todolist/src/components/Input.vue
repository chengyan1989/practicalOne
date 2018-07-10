<template>
    <div>
       <input type="text" placeholder="请输入你的姓名" v-model="input">
    </div>
</template>
<script>
export default {
    computed: {
        input: {
            get(){
                return this.$store.state.input.input
            },
            set(value){
                this.$store.commit('changeInput', {
                    input: value
                })
            }
        }
    },
    // methods: {
    //     changeInput(e){
    //         this.$store.commit('changeInput', {
    //             input: e.target.value
    //         })
    //     }
    // }
}
</script>

