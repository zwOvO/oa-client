
const app = getApp()
const recordApi = require('../../../services/record.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uuid:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      uuid: options.uuid,
    });
  },

  formSubmit: function(e){
    wx.showLoading({
      title: '打卡中...',
    })
    recordApi.punchTheClock(app.globalData.openid, this.data.uuid).then((response) => {
      console.log(response)
      if(response.status == 200)
      {
        wx.hideLoading();
        wx.showToast({
          title: '扫码成功!',
        })
      }else{
        wx.hideLoading();
        wx.showToast({
          title: '扫码失败!',
        })
      }
      wx.navigateBack({
        
      })
    })
  },

  onCancel: function(){
    wx.navigateBack({})
  },
})