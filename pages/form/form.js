// pages/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectRange: [1,2,3,4],
    multiSelectRange: [[1,2], [3,4]],
    selector: '',
    multiSelector: "",
    time: "",
    date: "",
    region: "",
    column1: 2,
    column2: 3,
    column1Arr: [1,2,3],
    column2Arr: [2,3,4]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  getNumber: function(e){
    console.log(e)  //没有权限
  },
  checkboxChange: function(e){
    console.log(e.detail.value)
  },
  selectorChange: function(e){
      this.setData({
          selector: this.data.selectRange[e.detail.value]
      })
  },
  multiSelectorChange: function(e){
      var tempStr = '';
      this.data.multiSelectRange.forEach(function(item, index){
          tempStr += item[e.detail.value[index]] + ' ';
      })
      this.setData({
          multiSelector: tempStr
      })
  },
  timeChange: function(e){
      this.setData({
          time: e.detail.value
      })
  },
  dateChange: function(e){
      this.setData({
          date: e.detail.value
      })
  },
  regionChange: function(e){
      this.setData({
          region: e.detail.value
      })
  },
  pickerChange: function(e){
    console.log(e)
      this.setData({
          column1: this.data.column1Arr[e.detail.value[0]],
          column2: this.data.column2Arr[e.detail.value[1]],
      })
  }
})
