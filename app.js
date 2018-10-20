const ServerApi = require('utils/api.js')

App({
  onLaunch(opts) {
    console.log('App Launch', opts)
    const vm = this;
    // if (vm.globalData.openid) {

    // } else {
    //   wx.login({
    //     success(data) {
    //       wx.request({
    //         url: ServerApi.miniprogramLogin,
    //         method: 'POST',
    //         data: {
    //           code: data.code
    //         },
    //         header: {
    //           'content-type': 'application/json' // 默认值
    //         },
    //         success(res) {
    //           console.log('拉取', res.data.result)
    //           if (typeof (res.data.result.openid) != "undefined") {
    //             console.log('拉取openid成功', res)
    //             vm.globalData.openid = res.data.result.openid
    //           } else {
    //             console.log('拉取openid失败', res)
    //           }
    //         },
    //         fail(res) {
    //           console.log('拉取用户openid失败，将无法正常使用开放接口等服务', res)
    //         }
    //       })
    //     },
    //     fail(err) {
    //       console.log('wx.login 接口调用失败，将无法正常使用开放接口等服务', err)
    //     }
    //   })
    // }
  },
  onShow(opts) {
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  globalData: {
    hasLogin: false,
    openid: undefined,
    userInfo: {},
  },
})
