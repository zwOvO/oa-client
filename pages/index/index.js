//index.js
//获取应用实例

Page({
  data: {
    startTime: undefined,
    stopTime:undefined,
    showModal: false,
    showType:'',
  },
  onLoad: function () {
  },

  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindStopTimeChange: function (e) {
    this.setData({
      stopTime: e.detail.value
    })
  },
  /**
   * 弹窗
   */
  showDialogWithPicker: function () {
    this.setData({
      showModal: true,
      showType:'record',
    })
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: 'leave/leave'
    })
  },
  bindPicTap: function () {
    this.setData({
      showModal: true,
      showType: 'f2',
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false,
      showModalWithPicker:false,
      showModalWithInput:false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
    this.setData({
      inputvalue:""
    })
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    const that = this;
    const showType = this.data.showType;
    const startTime = this.data.startTime;
    if(showType == "record")
    {
      const stopTime = this.data.stopTime;
      if (typeof (startTime) == "undefined"){
        wx.showToast({
          title: '开始日期不能为空',
          icon:'none',
          duration: 2000
        })
        return
      } else if (typeof (stopTime) == "undefined"){
        wx.showToast({
          title: '结束日期不能为空',
          icon: 'none',
          duration: 2000
        })
        return
      }
      this.hideModal();
      wx.navigateTo({
        url: `info/info?startTime=${startTime}&stopTime=${stopTime}`,
      })
    } else if (showType == "f2"){
      wx.navigateTo({
        url: `ff-canvas/column/column?startTime=${startTime}`,
      })
    }
  }
})