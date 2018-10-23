// pages/info/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:"",
    value:"",
    infoarray:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var parm = JSON.parse(options.parm);
    var that = this;
    this.setData({
      type: parm.type,
      value: parm.value
    })
    // wx.request({
    //   url: 'http://192.168.43.64:8080/yibanapi/selectapi',
    //   method: 'POST',
    //   data: {
    //     type: that.data.type,
    //     value: that.data.value
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded' // 默认值
    //   },
    //   success: function (res) {
    //     console.log(res.data);
    //     that.setData({
    //       infoarray:res.data
    //     })
    //   }
    // })
    this.setData({
      inputvalue: ""
    })
  },
})