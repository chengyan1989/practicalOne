<template>
    <div class="car-type">
        <div class="tit">
            <span v-for="(item,index) in carYear" :key="index" @click="yearClick({item,index})" :class="isActive==index?'active':''">{{item}}</span>
        </div>
        <div class="car-info-box">
            <div class="car-info">
                        <div class="car-info-box"  v-for="(item,index) in yearlist" :key="index">
                            <p class="car-info-tit">
                                <span>{{item.exhaust_str}}/</span>
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
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex";
export default {
    computed:{
        ...mapState({
            carYear:state=>state.caryearType.carYear,
            isActive:state=>state.caryearType.isActive,
            yearlist:state=>state.caryearType.yearlist,
        })
    },
    methods:{
        ...mapActions({
            yearClick:"caryearType/getyearList"
        })
    },
    mounted(){
        console.log(this.yearlist);
        let idnum=this.$route.query;
        this.$store.dispatch("caryearType/getData",idnum);
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/caryearType.scss";
</style>


