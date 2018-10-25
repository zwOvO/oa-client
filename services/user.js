/**
 * 用户相关服务
 */
const util = require('../utils/util.js');
const api = require('../utils/api.js');
const app = getApp()

function checkUserExist(openid) {
  console.log(openid+"---")
  return new Promise((resolve, reject) => {
    util.request(api.checkUserExist + `/${openid}`, {  }, 'GET').then(res => {
        resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function login(code, userInfo){
  return new Promise((resolve, reject)=>{
    util.request(api.miniprogramLogin, { code: code, userInfo: userInfo }, 'POST').then(res => {
      if (res.status == 200) {
        //存储用户信息
        app.globalData.hasLogin = true
        app.globalData.userInfo = userInfo
        app.globalData.openid = res.result.openid
        app.globalData.session_key = res.result.session_key
        console.log(app.globalData)
        resolve(app.globalData);
      } else {
        console.log(res)
        reject(res);
      }
    }).catch((err) => {
      console.log(err)
      reject(err);
    });
  })
}

function updateFace(openId, imageSrc){
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: api.uploadFace + `/${openId}`,
      filePath: imageSrc,
      name: 'file',
      success(res) {
        const respone = JSON.parse(res.data);
        console.log(respone)
        if (res.statusCode == 200 && respone.status == 200) {
          console.log('uploadImage success, res is:', res)
          resolve(res);
        } else {
          console.log('uploadImage fail, errMsg is', res)
          reject(res);
        }
      },
      fail({ errMsg }) {
        console.log('uploadImage fail, errMsg is', errMsg)
        reject(err);
      }
    })
  })
}

function register(openId, nickname, username, avatar, faceToken, gender) {
  return new Promise((resolve, reject) => {
    util.request(api.register, { openId, nickname, username, avatar, faceToken, gender }, 'POST').then(res => {
      if (res.status == 200) {
        //存储用户信息
        resolve(res);
      } else {
        reject(res);
      }
    }).catch((err) => {
      reject(err);
    });
  })
}



module.exports = {
    login,
    updateFace,
    register,
    checkUserExist,
};











