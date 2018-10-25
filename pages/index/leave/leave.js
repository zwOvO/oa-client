// pages/leave/leave.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  leaveForm: function (event){
    console.log(event.target.dataset.id)
    wx.navigateTo({
      url: `leaveForm/leaveForm?id=${event.target.dataset.id}`,
    })
  }
})