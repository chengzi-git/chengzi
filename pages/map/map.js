// pages/classify/classify.js
Page({
  data: {
    longitude: 0,
    latitude: 0
  },
  
  //腾讯位置服务路线规划
  routePlanner: function () {
    let plugin = requirePlugin('routePlan');
    let key = 'UJMBZ-FTKWP-NS5DJ-VVMTW-L4ZI3-DAB7V';  //使用在腾讯位置服务申请的key
    let referer = '小橙天气';   //调用插件的app的名称
    let endPoint = JSON.stringify({  //终点
      'name': '',
      'latitude': this.data.latitude,
      'longitude': this.data.longitude
    });
    let navigation = 1
    wx.navigateTo({
      url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint + '&navigation=' + navigation
    });

  },

  onLoad: function () {
  },
  onReady: function () {
    // console.log(this)
    var _this = this;
    wx.getLocation({
      success: function (res) {
        // console.log(res);
        _this.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
      }
    })

  }
})