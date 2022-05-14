import Vue from 'vue'
import App from './App.vue'

import router from "./router";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import 'windi.css'
import store from "./stores/store";
import axios from "axios";

Vue.config.productionTip = false
Vue.use(Antd)

router.beforeEach((to, from, next) => {
	if (to.meta.requireAuth) {
		if (sessionStorage.getItem('login_status')) {
			next()
		} else {
			next('/login')
		}
	} else {
		if (sessionStorage.getItem('login_status') && to.name === 'login') {
			next('/index')
		} else {
			next()
		}
	}
})

document.title = '航Go - 大学生便民生活平台'
new Vue({
	router,
	store,
	axios,
	render: h => h(App),
}).$mount('#app')
