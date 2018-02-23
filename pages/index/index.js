//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: 'Hello World',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        button: {
            title: '我是组件'
        }
    },
    //事件处理函数
    bindViewTap: function (e) {
        console.log(e)
        wx.switchTab({
            url: '/pages/logs/logs'
        })
    },
    onLoad: function () {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    longPress: function(){
        console.log('触发长按事件');
    },
    parentTab: function(e){
        console.log('父组件事件，子组件参数：'+e.detail)
    },
    getUserInfo: function (e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    onReachBottom: function(){
        console.log('出发下拉刷新'); 
    },
    onPullDownRefresh: function(){
        console.log('出发上拉刷新')
        setTimeout(function () {
            console.log('停止上拉刷新');
            wx.stopPullDownRefresh();
        }, 2000)
    },
    onPageScroll: function(opt){
        console.log(opt.scrollTop)
    },
    onShareAppMessage: function(){
        return {
            title: '啦啦啦',
            path: ''
        }
    }
})
