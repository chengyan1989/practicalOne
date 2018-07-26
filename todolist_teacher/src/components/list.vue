<template>
    <div class="list">
       <div class="btn">
           <span @click="chageType('all')">全部</span>
           <span @click="chageType('finish')">已完成</span>
           <span @click="chageType('unfinish')">未完成</span>
       </div>
       <ul>
            <li @click="finish(item)" v-for="(item, index) in list" :key="index" :style="{textDecoration:item.finish?'line-through':''}">{{item.text}}</li>
       </ul>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex';
export default {
    computed:{
        ...mapState({
            list:state=>{
                if(state.list.type=="all"){
                    return state.list.list
                }else{
                    return state.list.list.filter(item=>{
                        return item.finish==(state.list.type=="finish")
                    })
                }
            }
        })
    },
    methods:{
        ...mapMutations({
             finish: 'finish',
             chageType: 'changeType'
        })
    }
}
</script>

