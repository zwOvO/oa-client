
const app = getApp()
const userApi = require('../../../services/user.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    gender: [
      {
        key: 1,
        value: '男'
      },
      { 
        key: 2, 
        value: '女' 
      }
    ],
    index:0,

    imageSrc: '',
    faceToken:'',

    inputting:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindNameInput: function (e) {
    this.setData({
      username: e.detail.value
    })
  },

  bindGenderChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    console.log(e)
    const self = this;
    if (self.data.username.length < 1){
      e.detail
      wx.showToast({
        title: '姓名不可为空，请输入姓名',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '用户注册中，请稍后...',
    })
    const openId = app.globalData.openid
    const userInfo = app.globalData.userInfo
    const username = self.data.username
    const nickname = userInfo.nickName
    const avatar = userInfo.avatarUrl
    const gender = self.data.index + 1
    userApi.register(openId, nickname, username, avatar, '', gender).then((response) => {
      wx.hideLoading()
      wx.showToast({
        title: '注册成功！',
        icon: 'success',
        duration: 1000
      })
      wx.redirectTo({
        url: 'validateFace/validateFace',
      })
    }).catch((response) => {
      wx.hideLoading()
      wx.showToast({
        title: '注册失败！',
        icon: 'none',
        duration: 1000
      })
      console.log('失败：' + response);
    });
  },
})