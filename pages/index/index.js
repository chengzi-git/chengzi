// pages/home/home.js
var QQMapWX = require('../../js/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weather: {},
    date:"",
    weekinfo:[],
    otherinfo:[],
    houerweather:[],
    lifeweather:[],
    lifeimg: ['../../images/life1.png', 'null', '../../images/life2.png', '../../images/life3.png', '../../images/life4.png','../../images/life5.png']
  },
  value:"",
  //监听用户刷新
  onPullDownRefresh:function(){
    this.weathertoday(this.data.weather.city)
    this.weekWeather(this.data.weather.city)
  },
  
  onLoad: function(){
    
    //记录tihs的指向
    var _this= this
    qqmapsdk = new QQMapWX({
      key: 'UJMBZ-FTKWP-NS5DJ-VVMTW-L4ZI3-DAB7V' // 必填
    });  
    wx.getLocation({
      success: function(res) {
        //获取经纬度
        // console.log(res)
        //逆地址解析
        qqmapsdk.reverseGeocoder({
          success: function (res) {
            //数据成功返回页面停止刷新
            wx.stopPullDownRefresh()
            // console.log(res)
            //获取当前城市
            // console.log(res.result.address_component.district)

            _this.weathertoday(res.result.address_component.district.substr(0,2))
            _this.weekWeather(res.result.address_component.district.substr(0, 2))

          }
        })
        
      }
    })
  },
  // 实况天气（1天）
   weathertoday:function(city){
     //记录this指向
     var _this = this
    //  console.log(city)
      wx.request({
        url: 'https://www.tianqiapi.com/api/',
        data: {
          "appid":"92196163",
          "appsecret": "uR2NaxND",
          "version" : "v6",
          "city": city
        },
        method: "GET",
        success: function(res){
          // console.log(res)
          var obj = {
            tem: "温度（℃）",
            humidity:"湿度",
            air_pm25:"pm2.5",
            pressure:"气压(hpa)",
            win:"风向",
            win_meter:"风速",
            win_speed:"风力等级",
            visibility:"能见度"
          }
          var arr = []
          //对对象循环遍历，用for in k指的是对象里的属性名或键名
          for(var k in obj){
            // console.log(k)
            var o = {}
            for(var y in res.data){
              // console.log(y)
              if(k==y){
                o["name"] = obj[k]
                o["val"] = res.data[y]
                arr.push(o)
              }
            }
          }
          // console.log(arr)
          _this.setData({
            otherinfo:arr,
            weather :res.data,
            date : res.data.date.substr(5,5),
          })

          // console.log(_this.data.weather)
        }
      })
      

  },
  // 实况天气（7天）
  weekWeather:function(city){
    var _this = this
    wx.request({
      url: 'https://www.tianqiapi.com/api/',
      data: {
        "appid": "92196163",
        "appsecret": "uR2NaxND",
        "version": "v1",
        "city": city
      },
      method: "GET",
      success: function (res) {
        _this.setData({
          weekinfo: res.data.data,
          houerweather:res.data.data[0].hours,
          lifeweather:res.data.data[0].index,
        })
      }
    })
  },
  //搜索地区天气
  findFun:function(e){
    if (e.detail.value.length!=0){
      this.weathertoday(e.detail.value)
      this.weekWeather(e.detail.value)
    } 
    
    this.setData({
      value:""
    })
  }
})