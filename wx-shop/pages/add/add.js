// pages/add/add.js
import {
    getAdd
} from "../../utils/url";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allAddList: "", //所有城市
        addTit: "", //左边城市
        isActive: 0,
        addCity: "",
    },
    cityClick(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            isActive: index,
            addCity: this.data.allAddList[index].list
        });
    },
    checkeds(e) {
        let index = e.currentTarget.dataset.index;
        let addCity = this.data.addCity;
        if (addCity[index].isCkecked==false){
            addCity[index].isCkecked = true;
        }else{
            addCity[index].isCkecked = false;
        }
        
        this.setData({
            addCity
        });
        let id;
        let addTit = this.data.addTit;
        this.data.addCity.forEach(item => {
            if (item.isCkecked) {
                id = item.id.split("_")[0];
            }
        });
        console.log(id);
        addTit.forEach(val => {
            if (id == val.id) {
                val.count++
            }
        })
        this.setData({
            addTit
        })
    },
    subimit(e){//获取用户信息
        let userinfo = JSON.parse(e.detail.rawData)
        // wx.navigateTo({
        //     url: '../city/city?username=' + userinfo.nickName
        // });
        let provinceNum=0;//去过的省市个数
        let cityNum=0;//去过的城市个数
        let cityName=[]//去过的城市名称
        this.data.addTit.forEach(item=>{
            if(item.count!==0){
                console.log(item.count);
                provinceNum+=item.count;
            }
        });
        this.data.addCity.forEach(item=>{
            console.log(item);
            if(item.isCkecked&&cityName.indexOf(item.name)==-1){
                cityName.push(item.name);
            }
        })
        console.log(cityName);
        // wx.setStorage(
        //     {
        //         key: "addTit",//省
        //         data: this.data.addTit,
        //     }
        // )
    },
    onLoad: function(options) { //生命周期函数--监听页面加载
        getAdd().then(res => {
            let addTit = [] //左边的数据
            res.data.forEach((item, index) => {
                if (addTit.indexOf(item.name) == -1) {
                    addTit.push({
                        name: item.name,
                        count: item.count,
                        id: index
                    });
                }
                item.list.forEach((val, key) => {
                    val.id = index + "_" + key
                })
            });
            this.setData({
                allAddList: res.data,
                addCity: res.data[0].list,
                addTit,
            });
            wx.hideLoading();//隐藏loading提示框
        })
    },

    onShow: function() { //生命周期函数--监听页面显示
        wx.showLoading({ //显示loading提示框
            title: "加载中..."
        })
    },
})