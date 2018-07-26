//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    start() { //开始点击事件
        wx.navigateTo({
            url: '../add/add'
        })
    }
})