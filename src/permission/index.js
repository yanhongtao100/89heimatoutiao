// 权限管理
import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局守卫
router.beforeEach(function (to, from, next) {
  progress.start()

  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(function () {
  window.setInterval(() => {
    progress.done()
  }, 1000)
})
