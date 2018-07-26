<template>  
    <div class="wrap">
        <div class="loading" v-show='loadFlag'>
            <div class="img-box">
                <img src="../assets/loading.gif" alt="">
                <span>加载中...</span>
            </div>
        </div>
        <letter :letter="letter" :changeLetter="changeLetter"/> 
        <div class="carlist-box" ref="carlistbox">
            <CarList :carList="carList" />
        </div>
        <Master :masterList="masterList" :masterIsShow="masterIsShow" :hideMaster="hideMaster"/>
    </div>
</template>

<script>
import Letter from "./Letter";
import CarList from "./CarList";
import Master from "./Master";
import{mapActions,mapState} from "vuex";
    export default {
        components: {
            Letter,
            CarList,
            Master
        },
        computed:{//通过store获取数据
            ...mapState({//注入store内的state
                letter:state=>state.index.Letter,//导航的首个字母
                carList:state=>state.index.CarList,//首页列表
                loadFlag:state=>state.index.loadFlag,//是否显示loading画面
                masterList:state=>state.carList.masterList,//汽车品牌列表
                masterIsShow:state=>state.carList.masterIsShow//是否显示汽车品牌列表
            })
        },
        methods:{
            hideMaster(){
                this.$store.commit("carList/masterIsShow","")
            },
           changeLetter(letter){//字母点击 ，让对应的盒子置顶
               if(letter == "#"){
                   return;
               }
               let scrollTop = document.querySelector(`#${letter}`).offsetTop;
               this.$refs.carlistbox.scrollTop = scrollTop;
           }
        },
        mounted:function(){
           //汽车品牌请求数据
           this.$store.dispatch("index/getData");
        }
    }
</script>
<style lang="scss" scoped>
    @import "../sass/_index.scss";
</style>




