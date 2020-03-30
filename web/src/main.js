import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import '../src/assets/iconfont/iconfont.css'
import '../src/assets/css/csss.scss'
import router from './router'

import Card from './components/Card.vue'
Vue.component("m-card", Card)
import ListCard from './components/ListCard.vue'
Vue.component('m-list-card', ListCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
    baseURL: 'http://localhost:3000/web/api'
})
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default options with global component } */ )
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')