<template>
    <el-container class='wrap' :md="4" :lg="16" >
        <el-header style="height:80px;line-height:80px;font-size:24px;">
            <span>1601N班级管理系统</span>
            <span>欢迎<b>{{username}}</b>登录</span>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-row class="tac">
                    <el-col :span="12">
                        <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen"
                        @close="handleClose" background-color="#D3DCE6">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-edit"></i>
                                    <span slot="title" @click="reportCard">成绩单管理</span>
                                </template>
                                <router-link v-if="accessList.indexOf('view')!=-1" to="/content/report" tag="div">
                                    <el-menu-item index="1-1">查看成绩单</el-menu-item>
                                </router-link>
                                <router-link v-if="accessList.indexOf('modify')!=-1" to="/content/modify" tag="div">
                                    <el-menu-item index="1-2">修改成绩单</el-menu-item>
                                </router-link>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">综合积分管理</span>
                                </template>
                                 <router-link v-if="accessList.indexOf('checkin')!=-1" to="/content/checkin" tag="div">
                                    <el-menu-item index="2-1">点名</el-menu-item>
                                 </router-link>
                                 <router-link v-if="accessList.indexOf('query')!=-1" to="/content/query" tag="div">
                                    <el-menu-item index="2-2">查看综合积分</el-menu-item>
                                 </router-link>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-setting"></i>
                                    <span slot="title" @click="click">管理员</span>
                                </template>
                                <router-link v-if="accessList.indexOf('delete')!=-1" to="/content/delete" tag="div">
                                    <el-menu-item index="3-1">删除学生</el-menu-item>
                                </router-link>
                                <router-link v-if="accessList.indexOf('admin')!=-1" to="/content/admin" tag="div">
                                    <el-menu-item index="3-2">分配权限</el-menu-item>
                                </router-link>
                            </el-submenu>
                        </el-menu>
                    </el-col>
                </el-row>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data(){
        return{
            username:"",
            accessList:[] //权限列表
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      click(){//管理员
          this.$router.push("/content/admin");
      },
      reportCard(){//成绩单
          this.$router.push("/content/report");
      }
    },
     beforeRouteEnter (to, from, next) {
      next((vm)=>{
           // 从缓存中获取登陆态和登陆时间
      let isLogin = window.sessionStorage.getItem('isLogin'),
        loginTime = parseInt(window.sessionStorage.getItem('loginTime'));
      let current = +new Date();
      if (isLogin && current-loginTime<(600*1000)){
          // 登陆态在有效期内，不用拦截
      }else{
        console.log(this);
           let alert = vm.$alert('请先登陆', {
              callback: ()=>{
                  vm.$router.replace('/login');
              }
          });
      }
      });
    },
    mounted(){
        this.username=this.$route.query.username;// 获取登录用户的名字
        
        
         // 从缓存中获取权限列表
        let accessList = window.sessionStorage.getItem('accessList');
        console.log(accessList);
        if (accessList){
            accessList = JSON.parse(accessList);
        }else{
            accessList = [];
        }
        this.accessList = accessList;
    }
}
</script>


<style scoped>
 .wrap{
     width: 100%;
     height: 100%;
     /* overflow-y: scroll; */
 }
  .el-header {
    background-color: rgb(5, 48, 105);
    color: #fff;
    text-align: center;
    line-height: 150px;
    position: relative;
  }
  .el-header span:nth-child(2){
      position: absolute;
      right:30px;
      top:0;
      font-size: 14px;
      
  }
  .el-header span b{
    font-size: 18px;
    margin: 0 10px;
  }
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /* text-align: center; */
    /* line-height: 200px; */
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  
  body > .el-container {
    width: 100%;
    height: 100%;
  }

.el-col-12 {
    width: 100%;
}

</style>
