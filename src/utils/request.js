import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'

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
}, function (erro) {
  // 失败执行 所有的失败
  let status = erro.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '手机或验证码错误'
      break
    case 401:
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 403:
      window.localStorage.removeItem('user-token')
      router.push('/login')
      break
    case 507:
      message = '数据库服务异常'
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message: message })
})
export default axios
