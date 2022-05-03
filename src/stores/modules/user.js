import request from "../../utils/request";

export default {
	state: {
		login_status: sessionStorage.getItem('login_status') || false
	},
	getters: {},
	mutations: {
		SET_ROUTING (state, login_status) {
			state.login_status = login_status
			sessionStorage.setItem('login_status', login_status)
		},
		SET_INFO (state, data) {
			localStorage.setItem('user_id', data.user_id)
			localStorage.setItem('email', data.email)
			localStorage.setItem('user-token', data.token)
		},
		CLEAR_INFO () {
			localStorage.removeItem('user_id')
			localStorage.removeItem('email')
			localStorage.removeItem('user-token')
			sessionStorage.removeItem('login_status')
		}
	},
	actions: {
		LOGIN: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'web_auth/',
					method: 'post',
					data: payload
				}).then(response => {
					// console.log(response);
					commit('SET_ROUTING', true)
					commit('SET_INFO', response)
					resolve(true)
				}).catch(err => {
					localStorage.removeItem('user-token')
					reject(err.response)
				})
			})
		},
		LOGOUT: ({ commit }) => {
			return new Promise(resolve => {
				commit('SET_ROUTING', false)
				commit('CLEAR_INFO')
				resolve()
			})
		}
	}
}