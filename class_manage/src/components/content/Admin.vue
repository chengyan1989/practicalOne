<template>
    <div class="admin-page">
        <div v-if="isShowList" class="userlist">
            <el-table ref="multipleTable" :data="userList.slice((this.currentPage-1)*8, this.currentPage*8)" tooltip-effect="dark"
            style="width: 100%;" justify="space-around" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40">
                </el-table-column>
                <el-table-column prop="id" label="id" width="120">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="150">
                </el-table-column>
                <el-table-column prop="birthday" label="出生日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="phone" label="手机" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table> 
            <el-pagination class="page" background @current-change="change" layout="prev, pager, next" :total="userList.length+10">
            </el-pagination>
        </div>
        <div v-else class="roler-list" style="background:#fff;padding:10px;">
            <el-form ref="form" :model="from" label-width="80px" size="mini">
                <el-form-item label="用户名">
                    <el-input v-model="from.username"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="from.phone"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="from.address"></el-input>
                </el-form-item>
                <el-form-item label="出生日期">
                    <el-input v-model="from.birthday"></el-input>
                </el-form-item>
                <el-form-item label="已有权限">
                    <el-tag closable v-for="(item, index) in myRoler" :key="index" @close="removeTag(item, index)" style="margin:0 10px">{{item.rolername}}</el-tag>
                </el-form-item>
                <el-form-item label="全部权限">
                    <span v-for="(item, index) in rolerName" :key="index" @click="addTag(item)">
                        <el-tag style="margin:0 10px">{{item.rolername}}</el-tag>
                    </span>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="onback">返回</el-button>
        </div>
</div>
    
</template>

<script>
import axios from "axios";
  export default {
    data() {
      return {
        userList:[],//所有用户列表
        currentPage: 1,//当前页面
        isShowList:true,//控制是否显示
        from: {},//点击编辑的时候每一个成员的角色
        myRoler: [],//每个成员的角色列表
        rolerName:[]//全部角色名称
      }
    },
    methods: {
      onback() {
          this.isShowList = true;
      },
      change(page) {//页码
          this.currentPage = page
      },
      handleSelectionChange(val) {//列表
        this.multipleSelection = val;
      },
       handleEdit(index, row) {//编辑
        this.isShowList=false;
        this.from = row;
        this.getRolerList(row.id)
      },
      handleDelete(index,id) {//删除
        //首先删除渲染的列表
        this.userList.splice(index,1);
        //发送id帐号到后台数据库 更改status的值：加删除
         axios.get(`http://127.0.0.1:9000/delUser?id=${id}`).then(res=>{
            if(res.data.code==0){
                this.$alert("删除成功");
            }
        })
      },
      getRolerList(id) { //获取角色列表
            axios.get(`http://127.0.0.1:9000/rolerList?id=${id}`).then(res => {
                    if (res.data.code === 0) {
                        this.rolerName = res.data.rolerName;
                        this.myRoler = res.data.myRoler;

                    } else {
                        this.$alert(res.data.msg)
                    }
            })
       },
       removeTag(item, index) { //移除角色标签
           console.log(item,index);
            axios.get(`http://127.0.0.1:9000/removeRoler?uid=${this.from.id}&rid=${item.rid}`)
            .then(res => {
                if (res.data.code === 0) {
                    this.myRoler.splice(index, 1);
                } else {
                    this.$alert(res.data.msg);
                }
            })
        },
        addTag(item) { //添加角色
            // 判断用户是否有当前角色
            let index = this.myRoler.findIndex(value => {
                return value.rid == item.id;
            });
            if (index != -1) { 
                this.$alert("你已有当前角色");
                return;
            }
            //发起请求去数据库中添加角色，成功后更新前端页面
            axios.get(`http://127.0.0.1:9000/addTag?uid=${this.from.id}&rid=${item.id}`).then(res => {
                console.log(res);
                    if (res.data.code == 0) {
                   
                    this.myRoler.push({rid: item.id,
                        rolername: item.rolername
                    });
                    } else {
                        this.$alert(res.data.msg);
                    }
            });
        }
    },
    mounted(){
        //拉取用户列表
        axios.get("http://127.0.0.1:9000/userList")
        .then(res=>{
            this.userList=res.data.data;
        })
    }
  }
</script>
<style lang="scss">
.admin-page{
    width: 100%;
    height:100%;
    box-sizing: border-box;
}
.el-table th>.cell{
    text-align: center;
}
</style>
