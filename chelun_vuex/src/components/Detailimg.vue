<template>
    <div class="img-box" @scroll="scrollAll">
            <ul class="img-list" ref="ul">
                <li v-for="(item,index) in imgList" :key="index">
                    <img v-lazy="item.Url" alt="">
                </li>
            </ul>
            <swiper :options="swiperOption" ref="mySwiper" class="img_list">
                <swiper-slide v-for='(item,index) in list' :key='index'>
                    <img src='' :data-src='item.Url'/>
                </swiper-slide>
            </swiper-slide>
    </div>
    
</template>
<script>
import {mapActions,mapState}from "vuex";
//引入swiper
import {swiper,swiperSlide} from  'vue-awesome-swiper';
export default {
    data(){
        return {
            //数据
            list:[],
            //swiper参数
            swiperOption:{
                //切换动画时间
                speed:500,
                //swiper的懒加载  属性  布尔值  把img的src设置为：data-src 就可以实现懒加载
                lazy:true
            }
        }
    },
    computed:{
        ...mapState({
            pageNum:state=>state.detailimg.pageNum,
            imgList:state=>state.detailimg.imgList
        })
    },
    components:{
        swiper,
        swiperSlide
    },
    methods:{
        scrollAll(e){
            if (this.isFetching){
                return;
            }
            //最高的盒子,也就是长出去的盒子减去窗口的高度，计算出多余出去的高度
            let scrollHeight = this.$refs.ul.getBoundingClientRect().height - window.innerHeight;133
            let current = e.target.scrollTop;//最外层的滑动容器距头部的滚动距离
            if (current > (scrollHeight-20)){
                this.isFetching = true;
                // 加载下一页数据
               this.$store.dispatch("detailimg/getDate",{
            picid:this.picid,imgid:this.imgid, cb: ()=>{
                this.isFetching = false;
            }});
            }
        }
    },
    mounted(){
        this.isFetching = false;//开关
        this.picid=this.$route.query.picid;
        this.imgid=this.$route.query.id;
        this.$store.dispatch("detailimg/getDate",{
            picid:this.picid,imgid:this.imgid
        })
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/_Detailimg.scss";
//引入样式
@import 'swiper/dist/css/swiper.css';
</style>


