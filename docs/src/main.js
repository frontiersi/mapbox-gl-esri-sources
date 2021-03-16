import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueRouter from 'vue-router'
import router from './router'

Vue.use(VueRouter)
Vue.use(Antd)

const app = new Vue({ //eslint-disable-line
    router,
    el: '#app',
    render: h => h(App)
})
