<template>
    <div class="home-page">
        <header>
            <div class="logo">order.app</div>
            <div class="login-box" @click="lgoin">登录|注册</div>
        </header>
        <section>
            <nav>
                <p class="city_tip">
                    <span>当前定位城市：</span>
                    <span>当定位不准时，请在城市列表中选择</span>
                </p>
                <p class="city-location">
                    <router-link to="/city:id">{{cityName}}</router-link>
                </p>
            </nav>
            <div class="load-box" v-if="isloading">
                    <div class="loading">
                        加载中...
                    </div>
            </div>
            <div class="hot-city">
                <p class="hot-city-tit">热门城市</p>
                <ul class="hot-city-box">
                    <li v-for="(item,index) in hotCity" :key="index" @click="cityClick(item.id,item.name)">
                        {{item.name}}
                    </li>
                </ul>
            </div>
            <div class="city-list">
                <div v-for="(item,index) in cityList" :key="index" class="list-box">
                    <p class="list-tit">{{item.letter}}</p>
                    <ul>
                        <li v-for="(val,key) in item.payload" :key="key" @click="cityClick(val.id,val.name)">
                        {{val.name}}
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
import {mapState,mapMutations} from "vuex";
export default {
    data(){
        return {
        }
    },
    computed:{
        ...mapState({
            cityName:state=>state.home.cityName, //当前定位城市名称
            hotCity:state=>state.home.hotCity,//热门城市
            cityList:state=>state.home.cityList,//所有城市分类列表
            isloading:state=>state.home.isloading
        })
    },
    methods:{
        cityClick(id,cityname){
            this.$router.push({path:"/city:id",query:{id:id,cityname:cityname}})
            console.log(id);
        },
        lgoin(){
            this.$router.push({path:"/login"})
        }
    },
    mounted(){
        this.$store.commit("home/getcityname");
        this.$store.dispatch("home/getHotData");
        this.$store.dispatch("home/getAllData");
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/home.scss";
</style>

