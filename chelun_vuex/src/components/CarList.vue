<template>
    <div class="car-page">
            <div class="car-list">
                <div class="list" v-for="(val,ind) in carList" :key="ind" :id="val.letter">
                    <p class="carTit">{{val.letter}}</p>
                    <ul class="list-content" >
                        <li v-for="(item,ind) in val.list" :key="ind" @click="carListClick(item.MasterID)">
                            <span><img v-lazy="item.CoverPhoto" alt=""></span>
                            <h1>{{item.Name}}</h1>
                        </li>
                    </ul>
                </div>
            </div>
    </div>
</template>
<script>
import{mapActions,mapState} from "vuex";
export default {
    props:{
        carList:"",
    },
    methods:{
        ...mapActions({
               carListClick:"carList/carListClick"
            }),
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/_carList.scss";
</style>


