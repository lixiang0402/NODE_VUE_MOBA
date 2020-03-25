import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import '../src/assets/css/csss.scss'
new Vue({
    render: h => h(App),
}).$mount('#app')