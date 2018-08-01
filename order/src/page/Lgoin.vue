<template>
    <div class="login-page">
        <header>
            <router-link to="/home" tag="span"><</router-link>
            <b>登录注册</b>
        </header>
        <section class="login-box">
            <p><input type="text" placeholder="帐号" v-model="username"></p>
            <p><input type="password" placeholder="密码" v-model="passwords"></p>
            <p><input type="text" placeholder="验证码" v-model="vcode"> <span>{{randowNum}}</span><b @click="changeNum">换一换</b></p>
        </section>
        <div class="btn">
            <div class="msg">
                温馨提示：未注册过的账号，登录时将自动注册,注册过的用户可凭账号密码登录
            </div>
            <button @click="subimt">登录</button>
        </div>
        <div class="alert-box" v-if="isshowAlert">
            {{alermsg}}
            <div class="ok" @click="okClick">确定</div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            randowNum:"",
            username:"",//密码
            passwords:"",//登录名
            vcode:"",//验证码
            isshowAlert:false,
            alermsg:""
        }
    },
    methods:{
        getRandow(num){//获取随机的验证码
            let arr=[1,2,3,4,5,6,7,8,9,0]
            let newArr=[];
            for (var i = 0; i < num; i++) {
                var index = Math.floor(Math.random() * arr.length);
                newArr.push(arr[index]);
                arr.splice(index, 1);
            };
            
            this.randowNum=newArr.join("");
        },
        changeNum(){
            this.getRandow(4);  
        },
        subimt(){
            let obj={};
            obj.name=this.username;
            obj.paw=this.passwords;
            obj.vcode=this.vcode;
            if(!obj.name){
                this.isshowAlert=true;
                this.alermsg="账户不能为空";
            }else if(!obj.paw){
                this.isshowAlert=true;
                this.alermsg="密码不能为空";
            }else if(!obj.vcode||(obj.vcode!=this.randowNum)){
                this.isshowAlert=true;
                this.alermsg="请输入正确的验证码";
            }
            else if(obj.name&&obj.paw&&obj.vcode==this.randowNum){
                axios.post("http://127.0.0.1:9000/logined",obj).then(res=>{
                    console.log(res.data.code);
                    
                })
            }
        },
        okClick(){
            this.isshowAlert=false;
        }
    },
    mounted(){
        this.getRandow(4);
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/login.scss";
</style>

