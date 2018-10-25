const host = "http://192.168.31.235:21019/api/v1"
//const host = "http://192.168.43.64:21019/api/v1"
//const host = "http://192.168.122.1:21019/api/v1"
//const host = "http://192.168.1.116:21019/api/v1"
const api = {
  checkUserExist: `${host}/user/exist`,
  register: `${host}/user/register`,
  miniprogramLogin: `${host}/login/miniprogram`,
  uploadFace: `${host}/user/face`,

  punchTheClock: `${host}/record`,
  getRecordList: `${host}/record/list`,
  getRecordListByDate: `${host}/record/date`,
}

module.exports = api