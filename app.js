const ServerApi = require('utils/api.js')

App({
  onLaunch(opts) {
    wx.redirectTo({
      url: 'pages/test/auth/auth',
    })
    console.log('App Launch', opts)
  },
  onShow(opts) {
    wx.redirectTo({
      url: 'pages/test/auth/auth',
    })
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: null,
    session_key: null,
    userInfo: {},
  },
})
