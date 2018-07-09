<template>  
    <div class="wrap">
        <div class="loading" v-show='loadFlag'>
            <div class="img-box">
                <img src="../assets/loading.gif" alt="">
                <span>加载中...</span>
            </div>
        </div>
        <letter :letter="letter" :changeLetter="changeLetter"/> 
        <div class="carlist-box" ref="carlistbox">
            <CarList :carList="carList" :carListClick="carListClick"/>
        </div>
        <Master :masterList="masterList" :masterIsShow="masterIsShow" :hideMaster="hideMaster"/>
    </div>
</template>

<script>
import Letter from "./Letter";
import CarList from "./CarList";
import Master from "./Master";
    export default {
        components: {
            Letter,
            CarList,
            Master
        },
        data(){
            return {
              letter:[],//导航的首个字母
              carList:[],//首页列表
              masterList:[],//汽车品牌列表
              masterIsShow:"",//是否显示汽车品牌列表,
              loadFlag:true,//是否显示loading画面
            }  
        },
        methods:{ 
            //汽车列表请求数据
            carListClick(id){
                fetch('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID='+id)
                .then(res=>{
                    res.json().then(body=>{
                        if(body.code==1){
                            this.masterList=body.data;
                            this.masterIsShow="active";
                        }else{
                            alert(body.msg)
                        }
                    })
                })
            },
            //汽车品牌请求数据
            getDate:function(){
				fetch("https://baojia.chelun.com/v2-car-getMasterBrandList.html")
				.then(res=>{
					res.json().then(body=>{
                        let data=body.data;
						var letter=[];//放26个字母
						var carlist=[];//车型
						data.forEach(function(val,ind){
							// console.log(val);
							let keyword=val.Spelling.slice(0,1);
							if(letter.indexOf(keyword)==-1){
								letter.push(keyword);
								carlist.push({
										letter:keyword, 
										list:[val]
								})
							}else{
							carlist.forEach(function(item,key){
								if(keyword==item.letter){
								item.list.push(val);
								}
							});
							}
						}) ;
                        letter.unshift("#");
						this.letter=letter;
                        this.carList=carlist;
                        this.loadFlag=false;
					})
				})
            },
            hideMaster(){
                this.masterIsShow="";
            },
           changeLetter(letter){//字母点击 ，让对应的盒子置顶
               if(letter == "#"){
                   return;
               }
               let scrollTop = document.querySelector(`#${letter}`).offsetTop;
               this.$refs.carlistbox.scrollTop = scrollTop;
           }
        },
        mounted:function(){
           this.getDate();
        }
    }
</script>
<style lang="scss" scoped>
    @import "../sass/_index.scss";
</style>




