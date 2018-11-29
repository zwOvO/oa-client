// const host = "http://192.168.31.235:8080/oa-web"
// const host = "http://192.168.43.64:8080/oa-web"
const host = "https://www.zwovo.club/oa-web"
//const host = "http://192.168.122.1:8080/oa-web"
//const host = "http://192.168.1.116:8080/oa-web"
const api = {
  checkUserExist: `${host}/user/exist`,
  register: `${host}/user/register`,
  miniprogramLogin: `${host}/login/miniprogram`,
  uploadFace: `${host}/user/face`,
  bindLicense: `${host}/user/bindLicense`,

  punchTheClock: `${host}/record`,
  getRecordList: `${host}/record/list`,
  getRecordListByDate: `${host}/record/date`,

  getLeaveList: `${host}/leave/list`,
  submitLeaveForm: `${host}/leave/submit`,
}

module.exports = api