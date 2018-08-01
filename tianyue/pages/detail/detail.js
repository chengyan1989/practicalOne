// pages/detail/detail.js
import {
    getTitData
} from "../../utils/url.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageTit: "",
        goodsList: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let id = options.id
        if (id == 0) {
            getTitData().then(res => {
                console.log(res);
                this.setData({
                    pageTiT: res.response.data[0].title,
                    goodsList: res.response.data[1].goods
                })
            })
        }
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})