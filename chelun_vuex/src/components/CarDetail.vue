<template>
    <div class="detail-page">
        <section class="content">
            <div class="img" @click="imgClick(idNum)">
               <img v-lazy="detailList.CoverPhoto" alt="">
               <span>{{detailList.pic_group_count}}张照片</span>
            </div>
            <div class="info">
                <div class="pic">
                    <span >{{detailList.market_attribute &&detailList.market_attribute.dealer_price}}</span>
                    <span>指导价 {{detailList.market_attribute &&detailList.market_attribute.official_refer_price}}</span>
                </div>
                <div class="ask">
                    <button @click="allAskBtn">{{detailList.BottomEntranceTitle}}</button>
                </div>
            </div>
            <div class="car-list">
                <div class="car-data">
                    <span v-for="(item,index) in carYear" :key="index" :class="{active:isActive==index}" @click="infoClick({item,index})">{{item}}</span>
                </div>
                <div class="car-info">
                    <div class="car-info-box"  v-for="(item,index) in indexCarIfo" :key="index">
                        <p class="car-info-tit">
                            <span>{{item.car_id}}</span>
                            <span>{{item.exhaust_str}}</span>
                            <span>{{item.max_power_str}}</span>
                            <span>{{item.inhale_type}}</span>
                        </p>
                        <ul class="car-info-list">
                            <li >
                                <h1>
                                    <span>{{item.market_attribute.year}}款</span>
                                    <span>{{item.car_name}}</span>
                                </h1>
                                <h2>
                                   <span>{{item.horse_power}}马力</span>
                                   <span>{{item.gear_num}}档</span>
                                </h2>
                                <h3>
                                    <span>指导价{{item.market_attribute.official_refer_price}}</span>
                                    <span>{{item.market_attribute.dealer_price_min}}起</span>
                                </h3>
                                <h4>
                                    <button>询问底价</button>
                                </h4>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <footer>
            <p>询问低价</p>
            <p>本地经销商为你报价</p>
        </footer>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex";
export default {
    computed:{
        ...mapState({
            detailList:state=>state.cardetail.detailList,
            idNum:state=>state.cardetail.idNum,
            carYear:state=>state.cardetail.carYear,
            carInfoList:state=>state.cardetail.carInfoList,
            isActive:state=>state.cardetail.isActive,
            indexCarIfo:state=>state.cardetail.indexCarIfo,
        })
    },
    methods:{
        ...mapActions({
            infoClick:"cardetail/infoClick"
        }),
        imgClick(id){
            this.$router.push({
                path:"/carpic",
                query:{
                    id
                }
            })
        },
        allAskBtn(){//询问价格的btn
            let id=null;
            this.detailList.list.forEach((item,index)=>{
                if(index==0){
                    id=item.car_id*1;//触发类型转换 将字符串转为数值
                }
            });
             this.$router.push({
                path:"/carquotation",
                query:{
                    id
                }
            });
        }
    },
    mounted(){
       let id=this.$route.query.id;
       this.$store.dispatch("cardetail/getDetailData",id)
    },
}
</script>
<style lang="scss" scoped>
@import "../sass/detail.scss";
</style>


