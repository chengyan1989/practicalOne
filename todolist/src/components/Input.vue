<template>
    <div>
       <input type="text" placeholder="请输入你的姓名" :value="val" @input="inputChange">
       <button @click="addlist(val)">点击添加</button>
    </div>
</template>
<script>
import {mapState,mapMutations,mapActions} from "vuex";
export default {
    computed: {
       ...mapState({
          val:state=>state.todolist.val
       })
    },
    methods:{
       
      inputChange(e){
          this.$store.commit("changeInput",e.target.value)
      },
        //   addlist(){ 触发mutations的第一种方法，直接传参
        //       this.$store.commit("listchange",this.val);
        //   },
        //  ...mapMutations({//触发mutations的第二种方法，通过方法调用传递参数
        //      addlist:"listchange"
    //     });
        ...mapActions({
            addlist:"click"
        })
    },
    mounted(){
         this.$store.commit("filters")
    }
}
</script>

