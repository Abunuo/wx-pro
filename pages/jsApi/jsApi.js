// pages/jsApi/jsApi.js
const recorderManager = wx.getRecorderManager();
const backgroundAudioManager = wx.getBackgroundAudioManager();
const innerAudioContext = wx.createInnerAudioContext();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imglist:[],
    tempFilePath:'',
    locationInfo: '',
    network: '',
    scanCode: '',
    screenBright: 0,
    vibrateType: true,
    wifiList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getScreenBrightness({
      success: (res) => {
        this.setData({
          screenBright: res.value * 100
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.onUserCaptureScreen(function (res) {
      wx.showModal({
        title: '提示',
        content: '用户截屏了',
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //选择照片
  chooseImage: function(){
    var _this = this;
    wx.chooseImage({
      count: 2,
      success: function(res){
        _this.setData({
         imglist: res.tempFilePaths
       })
      }
    })
  },
  //预览图片，查看大图
  previewImage: function (e) {
    var current = e.target.dataset.src;
    console.log(current);
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imglist // 需要预览的图片http链接列表  
  })
  },
  //查看图片信息  and 保存到本地
  imgInfo: function(e){
    var _this = this;
    // wx.getImageInfo({
    //   src: e.target.dataset.src,
    //   success: function (res) {
    //     console.log(res.width)
    //     console.log(res.height)
    //     console.log(res.path)
    //   }
    // })
    wx.saveImageToPhotosAlbum({  //保存图片到本地
      filePath: e.target.dataset.src,
      success: function(res){
        if (res.errMsg == "saveImageToPhotosAlbum:ok"){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 1000
          })
        };
      }
    })
      // var current = e.target.dataset.src;
      // console.log(current)
      // wx.saveFile({
      //   tempFilePath: current,
      //   success: function (res) {
      //     console.log(res.savedFilePath); //保存到服务器
      //     _this.setData({
      //         imglist: [res.savedFilePath]
      //     })
      //     wx.showModal({
      //       title: '提示',
      //       content: '保存本地成功',
      //     })
      //   }
      // })
  },
  //录音 or 播放
  getRecorderManagerStart: function(){
    var _this = this;
    const options = {
      duration: 5000,
      sampleRate: 44100,
      numberOfChannels: 1,
      encodeBitRate: 192000,
      format: 'mp3',
      frameSize: 0.1
    }
    recorderManager.onStart(() => {
      console.log('recorder start')
    })
    recorderManager.onStop((res) => {
      console.log('recorder stop', res);
      _this.setData({
        tempFilePath: res.tempFilePath
      })
    })
    recorderManager.start(options)
  },
  getRecorderManagerStop: function () {
    recorderManager.stop();
  },
  getRecorderManagerPlay: function () {
    innerAudioContext.autoplay = true
    innerAudioContext.src = this.data.tempFilePath;
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  //获取背景音乐
  backgMusic: function(){
    console.log(backgroundAudioManager)
    backgroundAudioManager.title = '此时此刻'
    backgroundAudioManager.epname = '此时此刻'
    backgroundAudioManager.singer = '汪峰'
    backgroundAudioManager.coverImgUrl = 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000'
    backgroundAudioManager.src = 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E061FF02C31F716658E5C81F5594D561F2E88B854E81CAAB7806D5E4F103E55D33C16F3FAC506D1AB172DE8600B37E43FAD&fromtag=46' // 设置了 src 之后会自动播放
  },

  //获取当前位置
  locationInfo: function(){
    var _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        _this.setData({
          locationInfo: latitude + ' ' + longitude + ' ' + speed + ' ' + accuracy
        })
      }
    })
  },
  mapLocation: function(){
    var _this = this;
    wx.chooseLocation({
      success: function(res){
        _this.setData({
          locationInfo: res.name + ' ' + res.address
        })
      }
    });
  },
  wx_mapLocation: function(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          scale: 28
        })
      }
    })
  },
  // 获取系统信息
  getSystemInfo: function(){
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.brand)
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
      }
    })
  },
  //获取网络
  getNetwork: function(){
    var _this = this;
    wx.getNetworkType({
      success: function (res) {
        // 返回网络类型, 有效值：
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        _this.setData({
          network: res.networkType
        })
      }
    })
  },
  //打电话
  markCall: function(){
    wx.makePhoneCall({
      phoneNumber: '15712880306',//仅为示例，并非真实的电话号码
      success: function(res){
        console.log(res)
      }
    })
  },
  //扫码
  scanCode: function(){
    wx.scanCode({
      success: (res) => {
        this.setData({
          scanCode: res.result
        })
      }
    })
  },
  //复制文字
  clipboard: function(e){
    wx.setClipboardData({
      data: '零点过十分',
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            console.log(res.data) // data
          }
        })
      }
    })
  },
  //改变手机亮度
  changeScreenBright: function(e){
    wx.setScreenBrightness({
      value: e.detail.value/100
    })
  },
  //
  vibrateLong: function(e){
    var type = e.target.dataset.type;
    if(type){
      wx.vibrateLong()
    } else {
      wx.vibrateShort()
    }
    this.setData({
      vibrateType: !this.data.vibrateType
    })
  },
  //获取 WiFi 列表
  wifiList: function(){
    wx.startWifi()
    // wx.getConnectedWifi({
    //   success: function(res){
    //     wx.showModal({
    //       title: '',
    //       content: res.wifi.SSID
    //     })
    //   },
    //   fail: function (res) {
    //     wx.showModal({
    //       title: '',
    //       content: res.errMsg
    //     })
    //   }
    // })
    wx.onGetWifiList((res) => {
      this.setData({
        wifiList: (function(){
          var arr=[];
          res.wifiList.forEach((item)=>{
            arr.push(item.SSID)
          })
          return arr;
        })()
      })
    })
    wx.getWifiList();
  },
  showToast: function(){
    wx.showToast({
      title: 'Toast',
      icon:'none'
    })
  },
  //设置 tabbar
  setTabBar: function(){
   
  }
})