// pages/detail/detail.js
Page({
    /**
     * 页面的初始数据
     */
    data: {
        detailList: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options)
        this.index = options.index; //路由传递的参数
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        let list = wx.getStorageSync('allsongs');
        this.setData({
            detailList: list[this.index]
        })
    },






})