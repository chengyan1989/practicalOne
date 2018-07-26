// pages/detail/detail.js
const myaudio = wx.createInnerAudioContext();
let duration = 0;
var _animation; // 动画实体
var _animationIndex = 0; // 动画执行次数index（当前执行了多少次）
var _animationIntervalId = -1; // 动画定时任务id，通过setInterval来达到无限旋转，记录id，用于结束定时任务
const _ANIMATION_TIME = 2000; // 动画播放一次的时长ms

Page({
    data: {
        currentIndex: "",
        currentList: "",
        isplay: false,
        animation: "", //专辑播放动画
        percent:0,//当前音乐播放进度
    },
    onLoad: function(options) {
        let currentIndex = options.index; //当前点击进入歌曲下标
        this.setData({
            currentIndex
        })
    },
    onReady: function() {
        _animationIndex = 0;
        _animationIntervalId = -1;
        this.data.animation = '';
    },
    onShow: function() {
        let currentList = wx.getStorageSync('songlist');
        this.setData({
            currentList: currentList[this.data.currentIndex]
        });
        myaudio.src = this.data.currentList.src;
        myaudio.autoplay = true;
        myaudio.onCanplay(()=>{
            let inter = setInterval(() => {
                duration = myaudio.duration;
                if (duration){
                    clearInterval(inter);
                    console.log(duration);
                }
            }, 100)
        })
        //动画
        _animation = wx.createAnimation({
            duration: _ANIMATION_TIME,
            timingFunction: 'linear', 
            delay: 0,
            transformOrigin: '50% 50% 0'
        });
    },
    /**
   * 实现image旋转动画，每次旋转 120*n度
   */
    rotateAni: function (n) {
        _animation.rotate(120 * (n)).step()
        this.setData({
            animation: _animation.export()
        })
    },
    /**
   * 开始旋转
   */
    startAnimationInterval: function () {
        var that = this;
        that.rotateAni(++_animationIndex); // 进行一次旋转
        _animationIntervalId = setInterval(function () {
            that.rotateAni(++_animationIndex);
        }, _ANIMATION_TIME); // 每间隔_ANIMATION_TIME进行一次旋转
    },

    /**
     * 停止旋转
     */
    stopAnimationInterval: function () {
        if (_animationIntervalId > 0) {
            clearInterval(_animationIntervalId);
            _animationIntervalId = 0;
        }
    },
    //播放
    play: function() {
        this.startAnimationInterval();
        myaudio.play();
        // myaudio.onTimeUpdate(() => {
        //     let current = myaudio.currentTime;
        //     console.log(current, duration);
        // })
        
        this.setData({
            isplay: true
        });
    },
    // 暂停
    pause: function() {
        this.stopAnimationInterval();
        myaudio.pause();
        this.setData({
            isplay: false
        });
    }

})