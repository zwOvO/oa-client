/**
 * 打卡记录相关服务
 */
const util = require('../utils/util.js');
const api = require('../utils/api.js');
const app = getApp()


function submitLeaveForm(leaveType, message, startTime, stopTime) {
  return new Promise((resolve, reject) => {
    util.request(api.submitLeaveForm + `/${app.globalData.openid}`, { leaveType, message, startTime, stopTime}, 'POST').then(res => {
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

function getLeaveList(current,size) {
  return new Promise((resolve, reject) => {
    util.request(api.getLeaveList + `/${app.globalData.openid}`, { current,size }, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

module.exports = {
  submitLeaveForm,
  getLeaveList
};