<template>
    <div class="input">
        <input type="text" placeholder="todo...." :value="val" @input="changeInput">
        <button @click='addList(val)'>添加</button>
    </div>
</template>
<script>
    import {mapState,mapMutations} from "vuex";
export default {
    computed:{
        // val(){  //获取state的方法一
        //     return this.$store.state.list.val;
        // }
        ...mapState({//获取state的方法二
             val:state=>state.list.val
        })  
    },
    methods:{
        // changeInput(e){ //触发mutations的方法一  commit  
        //     this.$store.commit("chageInput",e.target.value);
        // },
        ...mapMutations({  //触发mutations的方法二  mapMutations映射mutations
            changeInput:"chageInput",
            addList:"addList"
        })
    }
}
</script>

