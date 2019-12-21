import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 请求拦截
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (erro) {

})

// 响应拦截
axios.interceptors.response.use(function (response) {
  // 成功执行
  return response.data ? response.data : {}// 实际上给then了
}, function () {
  // 失败执行
})
export default axios
