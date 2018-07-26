//index.js
//获取应用实例
const app = getApp()
import {getMusicList} from "../../utils/neturl.js";
Page({
  data: {
   songlist:[],//所有歌曲
  },
  onShow:function(){
      getMusicList().then(res=>{
          this.setData({
              songlist:res
          });
          wx.setStorageSync("songlist",res);//存储数据
      })
  },
    songclick(e){
        let index=e.currentTarget.dataset.index;

        wx.navigateTo({ //跳转详情路由 歌曲播放
            url:"../detail/detail?index="+index
        })
    }
})
