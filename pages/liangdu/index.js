// pages/liangdu/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:0
  },
  //bindchanging = "onbind" 拖动过程中触发的事件 
  onbind:function(event){
      // console.log(event.detail.value/100)
    wx.setScreenBrightness({
      value:event.detail.value/100
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //记录this指向
    var _this = this
    wx.getScreenBrightness({
      success:function(res){
        // console.log(res.value*100)
        _this.setData({
          content:res.value*100
        })
      }
    })

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

  }
})