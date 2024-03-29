import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './plugins/element.js'
import router from './router'
import http from './http'

import './style.css'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.mixin({
  computed: {
    uploadUrl() {
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
