// 在这房组件直接产全局引用
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import BreadCrumb from './common/bread-crumb.vue'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', BreadCrumb)// 面包屑组件。全局注册
  }
}
