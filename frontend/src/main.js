import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store'
import VueResource from 'vue-resource'
import './registerServiceWorker'
import infiniteScroll from 'vue-infinite-scroll'
import AsyncComputed from 'vue-async-computed'
import AOS from 'aos'
import VueContentLoading from 'vue-content-loading'
import VueParticles from 'vue-particles'
import InfiniteLoading from 'vue-infinite-loading'

import 'aos/dist/aos.css'
Vue.use(AsyncComputed)
Vue.use(VueResource)
Vue.use(VueCookies)
Vue.use(VueParticles)
Vue.use(infiniteScroll)
Vue.use(InfiniteLoading, {
  /* options */
})
Vue.config.productionTip = false

new Vue({
  router,
  created() {
    AOS.init({ disable: 'phone' })
  },
  store,
  render: h => h(App)
}).$mount('#app')
