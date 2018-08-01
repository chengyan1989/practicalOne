<template>
    <div class="city-page">
        <header>
            <router-link to="/home" tag="span"><</router-link>
            <b>{{cityname}}</b>
            <router-link to="/home" tag="span">切换城市</router-link>
        </header>
        <section>
            
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return{
            cityname:""
        }
    },
    mounted(){
        this.cityname=this.$route.query.cityname;
    },
}
</script>
<style lang="scss" scoped>
@import "../scss/city.scss";
</style>


