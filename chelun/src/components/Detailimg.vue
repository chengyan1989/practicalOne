<template>
    <div class="img-box">
            <ul class="img-list">
                <li v-for="(item,index) in imgList" :key="index">
                    <img v-lazy="item.Url" alt="">
                </li>
            </ul>
    </div>
</template>
<script>
export default {
    data(){
        return{
            imgList:[]
        }
    },
    methods:{
        getData(){
            let picid=this.$route.query.picid;//2539
            let id=this.$route.query.id//6
             fetch("https://baojia.chelun.com/v2-car-getCategoryImageList.html?SerialID="+picid+"&ImageID="+id+"&Page=1&PageSize=30&_1531054352382")
            .then(res=>{
                res.json().then(body=>{
                    this.imgList=body.data.List;
                    this.imgList.forEach((item,index)=>{
                        item.Url=item.Url.replace("{0}",3);
                    })
                })
            })
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/_Detailimg.scss";
</style>


