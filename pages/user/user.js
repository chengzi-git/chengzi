//index.js
//获取应用实例

Page({
  data: {
    iphone:Object
  },
  //事件处理函数
  onLoad: function () {
    let _this = this
    // 获取设备信息API
    wx.getSystemInfo({
      success: function(res) {
        _this.setData({
          iphone:res
        })
      },
    })
} ,
  ontap:function(event){
    // console.log("123")
    wx.navigateTo({
      url: '../../pages/liangdu/index'
    })
  },
  
})
