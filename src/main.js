import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '../src/styles/index.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './permission/index.js'
import Component from './components'
import axios from './utils/request'

Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(Component)
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
