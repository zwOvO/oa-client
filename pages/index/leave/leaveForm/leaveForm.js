import leaveApi from '../../../../services/leave.js'
Page({
  data: {
    startDay: undefined,
    stopDay: undefined,
    startTime: undefined,
    stopTime: undefined,
  },

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

  bindStartDayChange: function (e) {
    this.setData({
      startDay: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindStopDayChange: function (e) {
    this.setData({
      stopDay: e.detail.value
    })
  },
  bindStopTimeChange: function (e) {
    this.setData({
      stopTime: e.detail.value
    })
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit(e) {
    console.log(this.data.startDay)
    if(this.data.startDay === undefined) {
      wx.showToast({
        title: '开始日期不能为空!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if(this.data.startTime === undefined) {
      wx.showToast({
        title: '开始时间不能为空!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if(this.data.stopDay === undefined) {
      wx.showToast({
        title: '结束日期不能为空!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    if(this.data.stopTime === undefined) {
      wx.showToast({
        title: '结束时间不能为空!',
        icon: "none",
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '提交中...',
    })
    leaveApi.submitLeaveForm(
      e.detail.value.type, 
      e.detail.value.message,
      this.data.startDay + " " +  this.data.startTime,
      this.data.stopDay + " " + this.data.stopTime
      ).then((response) => {
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