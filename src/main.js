import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// 解决移动端300ms延迟问题
FastClick.attach(document.body)
// 使用图片懒加载的插件
Vue.use(VueLazyLoad, {
  loading: require('assets/img/common/placeholder.png')
})
// 注册toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
