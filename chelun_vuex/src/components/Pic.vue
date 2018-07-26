<template>
    <div class="img-page">
        <header>
            <span>颜色</span>
            <span>车款</span>
        </header>
        <div class="img-box">
            <ul class="img-list">
                <li v-for="(item,index) in imgList" :key="index">
                    <img v-lazy="item.url" alt="" @click="swiperImg">
                    <div class="item-msg" v-if="item.count" @click="picAllClick(item.id,id)">
                        <span>{{item.name}}</span>
                        <span>{{item.count}}张</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import {mapActions,mapState} from "vuex";
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    components:{
        swiper,
        swiperSlide
    },
    computed:{
        ...mapState({
            imgList:state=>state.pic.imgList
        })
    },
    data(){
        return{
            id:""
        }
    },
    methods:{
        //每张照片开头的点击事件
        picAllClick(picid,pageID){
            this.$router.push({path:"/detailimg",query:{id:picid,picid:pageID}})
        },
        swiperImg(){
            console.log(1);
        }
    },
    mounted(){
        let id=this.$route.query.id;
        this.id=id;
        this.$store.dispatch("pic/getImgList",id);
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/_pic.scss";
</style>


