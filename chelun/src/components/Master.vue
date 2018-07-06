<template>
    <div ref="master" :class='"master-list "+masterIsShow' @touchstart.stop="touchStart"
    @touchmove.stop="touchMove"
    @touchend.stop="touchEnd">
        <div class="master-list-box">
            <div class="goup" v-for="(item,index) in masterList" :key="index">
                <p class="tit">{{item.GroupName}}</p>
                <ul class="content-list">
                    <li v-for="(val,key) in item.GroupList" :key="key" :data-id="val.SerialID" @click="cardetails(val.SerialID)">
                        <div class="img">
                            <img :src="val.Picture">
                        </div>
                            <div class="content-text">
                                <p>{{val.AliasName}}</p>
                                <p>{{val.DealerPrice}}</p>
                            </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        masterList:"",
        masterIsShow:"",
        hideMaster:"",
    },
    methods: {
        //汽车详情请求数据列表
        cardetails(id){
            this.$router.push({path:'/cardetail',query:{
                id
            }}) 
        },
        touchStart(e){
            //碰触开始的位置信息
            let touch=e.touches[0];
            this.touchStartPageX=touch.pageX;
        },
        touchMove(e){
            //滑动的位置信息
            let touch=e.touches[0]
            this.movePageX=touch.pageX;
            //滑动的距离减去点击的距离大于100的时候就隐藏
            this.pageX=this.movePageX- this.touchStartPageX;
            if(this.pageX>0){//当滑动的值大于0的时候，可以跟随鼠标移动。
                this.$refs.master.style.transform=`translate3d(${this.pageX}px,0,0)`;
            }
        },
        touchEnd(e){
            this.$refs.master.style="";
            if(this.pageX>100){//当滑动的值小于100的时候，就让他隐藏了
                this.hideMaster();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../sass/_master.scss";
</style>


