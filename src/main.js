import Vue from 'vue'
import App from './App.vue'
import store from './store'
//导入router进行挂载
import router from './router'

Vue.config.productionTip = false

new Vue({
    store,
    render: h => h(App),
    router
}).$mount('#app')