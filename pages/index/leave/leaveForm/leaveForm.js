import leaveApi from '../../../../services/leave.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['事假', '婚假', '丧假', '产假', '年假', '调休',"病假"],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit(e) {
    wx.showLoading({
      title: '提交中...',
    })
    leaveApi.submitLeaveForm(e.detail.value.type, e.detail.value.message).then((response) => {
      console.log(response)
      wx.hideLoading();
      if (response.status == 200) {
        wx.showModal({
          title: '请假申请',
          content:'请假成功！',
          showCancel:false,
          success(res){
            if (res.confirm) {
              wx.navigateBack({
                delta:2,
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '请假失败!',
          icon: "none",
          duration: 2000
        })
      }
    }).catch((res) => {
      wx.hideLoading();
      wx.showToast({
        title: '请假失败!',
        icon: "none",
        duration: 2000
      })
    })
  },
})