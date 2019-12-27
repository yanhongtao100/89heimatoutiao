// 在这房组件直接产全局引用
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import BreadCrumb from './common/bread-crumb.vue'
import { quillEditor } from 'vue-quill-editor'
import CoverImage from './publish/cover-image.vue'
import Selectimage from '../components/publish/select-image.vue'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', BreadCrumb)// 面包屑组件。全局注册
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', CoverImage)
    Vue.component('select-image', Selectimage)
  }
}
