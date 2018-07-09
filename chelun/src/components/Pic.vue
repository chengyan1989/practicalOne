<template>
    <div class="img-page">
        <header>
            <span>颜色</span>
            <span>车款</span>
        </header>
        <div class="img-box">
            <ul class="img-list">
                <li v-for="(item,index) in imgList" :key="index">
                    <img v-lazy="item.url" alt="">
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
export default {
    data(){
        return{
            imgList:[],
            id:""
        }
    },
    methods:{
        getData(){
            let id=this.$route.query.id;
            this.id=id
            let newArr=[];
            fetch("https://baojia.chelun.com/v2-car-getImageList.html?SerialID="+id)
            .then(res=>{
                res.json().then(body=>{
                    let picArr=[];
                    body.data.forEach((item,index)=>{
                       item.List.forEach((val,key)=>{
                           val.Url=val.Url.replace("{0}",key+1)
                           if(key==0){
                               picArr.push({
                                   id:item.Id,
                                   name:item.Name,
                                   count:item.Count,
                                    url:val.Url
                               })
                           }else{
                                picArr.push({
                                   id:item.Id,
                                   name:item.Name,
                                   url:val.Url
                               })
                           }
                       })
                    });
                    this.imgList=picArr;
                })
            })
        },
        /*
         * 每张照片开头的点击事件
        **/
        picAllClick(picid,pageID){
            this.$router.push({path:"/detailimg",query:{id:picid,picid:pageID}})
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/_pic.scss";
</style>


