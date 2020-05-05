import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import './assets/iconfont/iconfont.css'
import './assets/scss/style.css'
import 'swiper/css/swiper.css'

import Card from './components/Card.vue'
import ListCard from './components/ListCard.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})
Vue.component('m-card', Card)
Vue.component('m-list-card', ListCard)

Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
