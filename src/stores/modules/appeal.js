import request from "../../utils/request";

export default {
	state: {
		appealList: []
	},

	getters: {},

	mutations: {
		SET_APPEAL_LIST: (state, payload) => {
			state.appealList = payload.appealList
		},
	},

	actions: {
		GET_APPEAL_LIST({ commit }) {
			return new Promise((resolve, reject) => {
				request({
					url: 'appeal/',
					method: 'get'
				}).then(response => {
					console.log(response)
					const info = []
					for (let i = 0; i < response.length; i++) {
						const m = response[i]
						info.push({
							id: m.id,
							userId: m.user.id,
							nickName: m.user.nickName,
							avatarUrl: m.user.avatarUrl,
							authority: m.authority,
							auth: m.authority == 0 ? "发布话题" :(m.authority == 1 ? "发布评论" :(m.authority == 2 ? "发布委托" : "接取委托")),
							create_time:m.create_time,
							reason:m.reason,
							key: m.id
						})
					}
					commit('SET_APPEAL_LIST', {
						appealList: info
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
	}
}