import request from "../../utils/request";

export default {
	state: {
		topicsInfo: []
	},
	mutations: {
		SET_TOPICS: (state, payload) => {
			state.topicsInfo = payload.topicsInfo
		}
	},
	actions: {
		GET_TOPICS: ({ commit }) => {
			return new Promise((resolve, reject) => {
				request({
					url: '/topic/',
					method: 'get',
					data: {
					}
				}).then(response => {
					console.log(response)
					const info = []
					for (let i = 0; i < response.length; i++) {
						const m = response[i]
						info.push({
							topicId: m.id,
							topicName: m.name,
							topicTime: m.create_at,
							likes: m.like,
							follows: m.follow,
							publisher:m.create_user.nickName,
							key: m.id
						})
					}
					commit('SET_TOPICS', {
						topicsInfo: info
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}