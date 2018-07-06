<template>
    <div class="detail-page">
        <section class="content">
            <div class="img">
               <img :src="detailList.CoverPhoto" alt="">
            </div>
            <div class="info">
                <div class="pic">
                    <span>{{detailList.market_attribute.dealer_price}}</span>
                    <span>指导价 {{detailList.market_attribute.official_refer_price}}</span>
                </div>
                <div class="ask">
                    <button>{{detailList.BottomEntranceTitle}}</button>
                </div>
            </div>
            <div class="car-list">
                <div class="car-data">
                    <span v-for="(item,index) in carYear" :key="index" :class="{active:isActive==index}" @click="infoClick(item)">{{item}}</span>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
export default {
    data(){
        return {
              detailList:"" ,
              carYear:[],//年份
              carInfoList:[],//每年的车信息
              isActive:0,
              
        }
    },
    methods:{
        getData(){
            let id=this.$route.query.id;
            fetch("https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID="+id)
            .then(res=>{
                res.json().then(body=>{
                    if(body.code==1){
                        this.detailList=body.data;
                        //处理全部、2017、2018的数据
                        let list=this.detailList.list;
                        let yearArr=["全部"];//车系的年份
                        let carInfoList=[];//每年的车信息
                        list.forEach((item,index)=>{
                            let year=item.market_attribute.year;
                            if(yearArr.indexOf(year)==-1){
                                yearArr.push(year);
                                carInfoList.push({
                                    year,
                                    list:[item]
                                })
                            }else{
                                carInfoList.forEach(function(val,index){
								if(year==val.year){
								val.list.push(item);
								}
							});
                            }
                        })  
                            carInfoList.unshift({
                                year:"全部",
                                list:list
                            })
                            this.carInfoList=carInfoList;
                            this.carYear=yearArr;
                            console.log(this.carInfoList);
                    }else{
                        alert(body.msg);
                    }
                })
            })
        },
        infoClick(index){
            console.log(index)
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/detail.scss";
</style>


