// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenModal: true,
    status:"未登录"
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

  formSubmit:function(e){
    var that = this;
    console.log(e.detail.value);
    that.setData({
      status: "正在登录..."
    })
    wx.request({    
      url: 'http://192.168.43.64:8080/yibanapi/loginapi',
      method:'POST',
      data: {
        name:e.detail.value.name,
        pwd:e.detail.value.pwd
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值 
      },    
      success: function (res) {
        if (res.data=="success"){
          that.setData({
            status: "登录成功！"
          })
          app.globalData.userInfo = e.detail.value.name;
          wx.redirectTo({
            url: '../index/index',
          })
        }else
        {
          that.setData({
            status: "登录失败！"
          })
        }
        console.log(res.data)
      }
    })
  }
})