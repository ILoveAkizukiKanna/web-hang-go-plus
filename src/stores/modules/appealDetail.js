import request from "../../utils/request";

export default {
	state: {
		appealDetail: {},
	},
	mutations: {
		SET_APPEAL_DETAIL: (state, payload) => {
			let info = payload.appealDetail
			state.appealDetail = {
				id: info.id,
				userId: info.user.id,
				nickName: info.user.nickName,
				avatarUrl: info.user.url,
				authority: info.authority,
				auth: info.authority == 0 ? "发布话题" :(m.authority == 1 ? "发布评论" :(m.authority == 2 ? "发布委托" : "接取委托")),
				create_time:info.create_time,
				reason:info.reason,
				key: info.id
			}
		},
		APPEAL_DETAIL_NOP: () => {}
	},
	actions: {
		GET_APPEAL_DETAIL: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'appeal/' + payload.appealId + '/',
					method: 'get',
					data: {
						
					}
				}).then(response => {

					commit('SET_APPEAL_DETAIL', {
						appealDetail: response
					})
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		NOT_PASS_APPEAL: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: '/appeal/save/',
					method: 'delete',
					data: {
						id: appealId,
						reason: payload.reason
					}
				}).then(() => {
					commit('APPEAL_DETAIL_NOP')
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		PASS_APPEAL: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: '/appeal/save/',
					method: 'post',
					data: {
						id: appealId,
					}
				}).then(() => {
					commit('APPEAL_DETAIL_NOP')
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
	}
}