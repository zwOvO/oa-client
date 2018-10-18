//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputvalue:"",
    showModal: false,
    showModalWithPicker:false,
    showDialogWithUNameInput:false,
    type:null
  },
  onLoad: function () {
  },
  bindValueChange: function (e) {
    this.setData({
      inputvalue: e.detail.value
    })
  },
  /**
   * 弹窗
   */
  showDialogWithPicker: function () {
    this.setData({
      showModal: true,
      showModalWithPicker: true,
      showDialogWithUNameInput:false,
      type:"日期"
    })
  },
  showDialogWithUNameInput: function () {
    this.setData({
      showModal: true,
      showModalWithInput: false,
      showDialogWithUNameInput: true,
      type: "用户名"
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
    this.hideModal();
    var that = this;
    var parm = {
      "type": that.data.type,
      "value": that.data.inputvalue
    };
    that.setData({
      inputvalue: ""
    })
    wx.navigateTo({
      url: '../info/info?parm=' + JSON.stringify(parm)
    })
  }
})