// pages/add/add.js
import { getAdd } from "../../utils/url";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allAddList: "", //所有城市
        addTit: "", //左边城市
        isActive: 0,
        addCity: ""
    },
    cityClick(e) {
        let index = e.currentTarget.dataset.index;
        this.setData({
            isActive: index,
            addCity: this.data.allAddList[index].list
        });
    },
    onLoad: function(options) { //生命周期函数--监听页面加载
        getAdd().then(res => {
            this.setData({
                allAddList: res.data
            });
            let addTit = []
            this.data.allAddList.forEach((item) => {
                if (addTit.indexOf(item.name) == -1) {
                    addTit.push(item.name);
                }
            });
            this.setData({
                addTit,
            })
        })
    },

    onShow: function() { //生命周期函数--监听页面显示
        this.setData({
            addCity: ["北京", "上海", "天津", "重庆", "香港", "澳门"]
        })
    },
})