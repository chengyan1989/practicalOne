<template>
    <div class="carquotation">
        <header>可向多个商家咨询最低价，商家及时回复</header>
        <div class="context-box">
            <div class="context">
                <div class="car-ifo"  @click="infoClick">
                    <div class="img">
                        <img :src="data.details && data.details.serial.Picture" alt="">
                    </div>
                    <div class="infor-box">
                        <h1>{{data.details && data.details.serial.AliasName}}</h1>
                        <h2>
                            <span>{{data.details && data.details.market_attribute.year}}款</span>
                            <span>{{data.details && data.details.car_name}}</span>
                        </h2>
                    </div>
                </div>
                <div class="self-info">
                    <p class="self-info-tit">个人信息</p>
                    <ul class="self-info-box">
                        <li>
                            <span>姓名</span>
                            <input type="text" placeholder="输入你的真实中文姓名">
                        </li>
                        <li>
                            <span>手机</span>
                             <input type="text" placeholder="输入你的真实手机号码">
                        </li>
                        <li>
                            <span>城市</span>
                            <span>北京</span>
                        </li>
                    </ul>
                    <div class="self-info-quotation">
                        <button>询最低价</button>
                    </div>
                </div>
                <div class="dealer-info">
                     <p class="dealer-info-tit">选择报价经销商</p>
                </div>
                <ul class="car-company-list">
                    <li v-for="(item,index) in data.list" :key="index" @click="listAddClick(index)" :class="ischecked==index?'active':''">
                        <div class="company-box">
                            <p class="company-name">
                                <b>{{item.dealerShortName}}</b>
                                <span>{{(item.promotePrice).slice(0,5)}}万</span>
                            </p>
                            <p class="company-add">
                                <span>{{item.address}}</span>
                                <span>售{{item.saleRange}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <footer>
            询最低价
        </footer>
    </div>
</template>
<script>
import {mapState,mapActions} from "vuex";
export default {
    data(){
        return{
            ischecked:0,
        }
    },
    computed:{
        ...mapState({
            data:state=>state.carquotation.data,
        }),
    },
    methods:{
        listAddClick(index){
            this.ischecked=index;
        },
        infoClick(){
            if(this.data.details){
                let id=this.data.details.serial.SerialID;
                this.$router.push({path:"/caryearType",query:{id}})
            }
        }
    },
    mounted(){
        let id=this.$route.query.id;
        this.$store.dispatch("carquotation/getData",id);
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/carquotation.scss";
</style>


