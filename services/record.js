/**
 * 打卡记录相关服务
 */
const util = require('../utils/util.js');
const api = require('../utils/api.js');
const app = getApp()


function punchTheClock(openId, uuid) {
  return new Promise((resolve, reject) => {
    util.request(api.punchTheClock, { openId,uuid }, 'POST').then(res => {
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

function getRecordList(openId, current, size, startTime, stopTime) {
  return new Promise((resolve, reject) => {
    util.request(api.getRecordList + `/${openId}`, { current, size, startTime, stopTime }, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

function getRecordListByDate(openId, date) {
  return new Promise((resolve, reject) => {
    util.request(api.getRecordList + `/${openId}`, { date }, 'GET').then(res => {
      resolve(res);
    }).catch((err) => {
      reject(err);
    });
  })
}

module.exports = {
  punchTheClock,
  getRecordList,
  getRecordListByDate
};











