<template>
    <div class="report">
          <div class="report-box" v-if="isShow">
            <el-table ref="multipleTable" :data="reportList.slice((this.currentPage-1)*8, this.currentPage*8)" tooltip-effect="dark"
            style="width: 100%;" justify="space-around" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="40">
                </el-table-column>
                <el-table-column prop="uid" label="id" width="120">
                </el-table-column>
                <el-table-column prop="username" label="姓名" width="150">
                </el-table-column>
                <el-table-column prop="score" label="成绩" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="data" label="日期" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="reportNum(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table> 
            <el-pagination class="page" background @current-change="change" layout="prev, pager, next" :total="reportList.length+10">
            </el-pagination>
        </div>
        <div class="report-num" v-else>
            <el-form :label-position="labelPosition" label-width="80px" :model="reportPeop">
                <el-form-item label="学生姓名">
                <el-input v-model="reportPeop.username"></el-input>
                </el-form-item>
                <el-form-item label="学生成绩">
                <el-input v-model="reportPeop.score"></el-input>
                </el-form-item>
                <el-form-item label="学生学好">
                <el-input v-model="reportPeop.uid"></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="onback">返回</el-button>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data(){
        return{
            reportList:[],
            currentPage: 1,//当前页面
            isShow:true,
            reportPeop:"" ,//个人信息
            labelPosition: 'right',//表格对齐方式
        }
    },
    methods:{
      change(page) {//页码
          this.currentPage = page
      },
        handleSelectionChange(val) {//列表
        this.multipleSelection = val;
      },
      handleDelete(index,id) {//删除
        
      },
      reportNum(index,row){
          this.isShow=false;
          this.reportPeop=row;
          console.log(this.reportPeop.score)
      },
      onback(){
          this.isShow=true;
      }
    },
    mounted () {
        axios.get("http://127.0.0.1:9000/reportTable").then(res=>{
            if(res.data.code==0){
                this.reportList=res.data.data;
            }else{
                this.$alert(res.data.msg);
            }
            
        })
    }
}
</script>

<style lang="scss">
.report-box{
    width: 100%;
    height:100%;
    box-sizing: border-box;
}

.el-table th > .cell {
    text-align: center;
}
</style>

