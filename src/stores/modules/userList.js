import request from "../../utils/request";

export default {
	state: {
		userList: []
	},

	getters: {},

	mutations: {
		SET_USER_LIST: (state, payload) => {
			state.userList = payload.userList
		},
	},

	actions: {
		async GET_USER_LIST({ commit }) {
			return new Promise((resolve, reject) => {
				request({
					url: 'users/',
					method: 'get'
				}).then(response => {
					console.log(response.results)
					commit('SET_USER_LIST', {userList: response.results
							.filter(u => !u.is_staff && u.audit_status === 3)
							.map(({id, nickName, avatarUrl, email, gender, average_rate}) =>
								({id, nickName, avatarUrl, email, gender, avg_score: average_rate.remark__avg || '暂无评分'}))
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
	}
}