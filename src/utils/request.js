import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui'
import JSONBig from 'json-bigint'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 请求拦截
axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (erro) {

})
// 数据到达响应拦截器之前到的函数
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data)// 引用工具处理大数据
}]
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
      message = '数据错误'
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
  return Promise.reject(erro)
})
export default axios
