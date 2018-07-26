<template>
    <div>
        <div class="tit">
            <div class="list">
                <p>全部数据</p>
                    <ul>
                         <li v-for="(item,index) in list" :key="index" :style="item.finish?{textDecoration:'line-through'}:''">{{item.text}}</li>
                    </ul>
            </div>
            <div class="list">
                <p>已完成</p>
                <ul>
                   <li v-for="(item,index) in finished" :key="index" :style="item.finish?{textDecoration:'line-through'}:''">{{item.text}}</li>
                </ul>
            </div>
             <div class="list">
                <p>未完成</p>
                <ul>
                   <li v-for="(item,index) in unfinished" :key="index" :style="item.finish?{textDecoration:'line-through'}:''">{{item.text}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex";
export default {
 computed:{
   ...mapState({
       list:state=>state.todolist.list,
       finished:state=>state.todolist.finished,
       unfinished:state=>state.todolist.unfinished
   })
 }
}
</script>
<style lang="scss" scoped>
.tit{
    display: flex;
    .list{
        flex:1;
        text-align: center;
    }
}
</style>


