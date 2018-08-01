//index.js
//获取应用实例
const app = getApp()
import {getData} from "../../utils/url.js";
Page({
    data: {
        imgUrls: [],//轮播图数据,
        menu:"",//所有数据
        article:"",//文章专题数据
        indicatorDots: true, //轮播图小点选项
        autoplay: true,//是否自动播放
        interval: 2500,//自动切换时间间隔
        duration: 1000//动画时长
    },
    onLoad(){
        getData().then(res=>{//请求数据
            console.log(res);
            this.setData({
                imgUrls:res.swiper,
                menu:res.menu,
                article:res.article
            })
            wx.hideLoading();//隐藏loading提示框
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () { //只有在初次渲染的时候调用loading
        wx.showLoading({ //显示loading提示框
            title: "加载中..."
        })
    },
    goodsListTitClick(e){
        let index=e.currentTarget.dataset.index;
        wx.navigateTo({
            url: `../detail/detail?id=${index}`
        })
    }
})