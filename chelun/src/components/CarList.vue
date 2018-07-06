<template>
    <div class="car-page">
            <div class="car-list">
                <div class="list" v-for="(val,ind) in carList" :key="ind" :id="val.letter">
                    <p class="carTit">{{val.letter}}</p>
                    <ul class="list-content" >
                        <li v-for="(item,ind) in val.list" :key="ind" @click="carListClick(item.MasterID)">
                            <span><img :src="item.CoverPhoto" alt=""></span>
                            <h1>{{item.Name}}</h1>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
</template>
<script>
export default {
    props:{
        carList:"",
        carListClick:""
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/_carList.scss";
</style>


