<template>
    <div class="detail-page">
        <section class="content">
            <div class="img" @click="imgClick(idNum)">
               <img v-lazy="detailList.CoverPhoto" alt="">
               <span>{{detailList.pic_group_count}}张照片</span>
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
                    <span v-for="(item,index) in carYear" :key="index" :class="{active:isActive==index}" @click="infoClick(item,index)">{{item}}</span>
                </div>
                <div class="car-info">
                    <div class="car-info-box"  v-for="(item,index) in indexCarIfo" :key="index">
                        <p class="car-info-tit">
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
export default {
    data(){
        return {
              detailList:"" ,
              carYear:[],//年份
              carInfoList:[],//每年的车信息
              isActive:0,
              indexCarIfo:[],//点击时候的数据
              idNum:""//ID号
        }
    },
    methods:{
        getData(){
            let id=this.$route.query.id;
            this.idNum=id
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
                            this.carYear=yearArr;//年份
                            //分装排序方法
                            let sortCarlist = (arr)=>{
                                return arr.sort((a,b)=>{
                                    if(a.exhaust<b.exhaust){
                                        return -1;
                                    }else if(a.exhaust>b.exhaust){
                                        return 1;
                                    }else{
                                        if(a.msx_power<b.max_power){
                                            return -1;
                                        }else if(a.msx_power>b.max_power){
                                            return 1;
                                        }else{
                                            return b.inhale_type-a.inhale_type;
                                        }
                                    }
                                })
                            };
                            //调用排序
                            carInfoList.forEach(item=>{
                                 sortCarlist(item.list);
                            })
                            this.carInfoList=carInfoList;//所有数据  一个数组
                            this.infoClick("全部",0);
                    }else{
                        alert(body.msg);
                    }
                })
            })
        },
        infoClick(keyword,index){
            this.isActive=index;
            this.carInfoList.forEach((item,index)=>{
                if(keyword==item.year){
                    this.indexCarIfo=item.list;
                    // console.log(this.indexCarIfo);
                }
            })
        },
        imgClick(id){
            this.$router.push({
                path:"/carpic",
                query:{
                    id
                }
            })
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


