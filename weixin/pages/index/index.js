//index.js
//获取应用实例
const app = getApp();
import { getMusicList } from "../../utils/net"; //获取音乐列表数据请求

Page({
    data: { // 参与页面渲染的数据
        songs: [],
        allsongs: [], //所有歌曲
        num: 1
    },
    onShow: function() { // 页面渲染后 执行
        wx.showLoading({ //显示loading提示框
            title: "加载中..."
        })
        getMusicList().then(res => { //获取数据
            this.setData({
                allsongs: res.songs, //所有歌曲
                songs: res.songs.slice(0, 10) //每次只显示10条数据
            }, () => {
                wx.hideLoading(); //隐藏loading提示框
            })
        });
    },
    onReachBottom() { //上拉加载的事件
        this.setData({
            num: this.data.num++,
            songs: this.data.allsongs.slice(0, this.data.num * 10)
        })
    },
    onPullDownRefresh() { //处理函数，监听该页面用户下拉刷新事件。
        wx.showLoading({ //显示loading提示框
            title: "数据加载中..."
        });
        setTimeout(function() {
            wx.hideLoading()
        }, 2000)
    },
    songClick(e) { //没首歌曲的点击事件
        let index = e.currentTarget.dataset.index; //被点击的下标
        wx.navigateTo({ // 路由跳转
            url: '../detail/detail?index=' + index,
        });
        // 缓存
        wx.setStorageSync('allsongs', this.data.allsongs);
    }

})