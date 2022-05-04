import request from "../../utils/request";

export default {
	state: {
		commissionInfo: {},
		comments: []
	},
	mutations: {
		SET_APPLIED_ACOMMISSION: (state, payload) => {
			let info = payload.commissionInfo
			state.commissionInfo = {
				id: info.id,
				name: info.name,
				isReal: info.real_time == 1 ? '是' : '否',
				startTime: info.start_time,
				stopTime: info.end_time,
				description: info.description,
				photo: 'http://114.116.215.100:443' + info.photo,
				hasPhoto: info.photo !== '',
				type: info.type
			}
		},
		SET_CCOMMENTS: (state, payload) => {
			state.comments = payload.comments
		},
		CLEAR_CCOMMENT: () => {

		},
		APPLIED_COMMISSION_NOP: () => {
		
		}
	},
	actions: {
		GET_APPLIED_ACOMMISSION: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'commission/detail/',
					method: 'post',
					data: {
						commission_id : payload.commissionId
					}
				}).then(response => {

					commit('SET_APPLIED_ACOMMISSION', {
						commissionInfo: response
					})
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		GET_CCOMMENTS: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'comment_commissions/' + payload.commissionId + '/',
					method: 'get'
				}).then(response => {
					const comments = []
					for (let i = 0; i < response.length; i++) {
						const m = response[i]
						comments.push({
							commentId: m.id,
							author: m.user.nickName,
							avatar: m.user.avatarUrl,
							content: m.comment,
							datetime: m.comment_time
						})
					}
					commit('SET_CCOMMENTS', {
						comments: comments
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		DELETE_CCOMMENT: ({ commit }, payload) => {
			// console.log(payload);
			return new Promise((resolve, reject) => {
				request({
					url: '/commission/comment/' + payload.commentId + '/',
					method: 'delete'
				}).then(() => {
					commit('CLEAR_COMMENT')
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		NOT_PASS_CHECK_COMMISSION: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'users_admin/reject_commission/',
					method: 'post',
					data: {
						id: payload.commissionId,
						reason: payload.reason
					}
				}).then(() => {
					// console.log(response)
					commit('APPLIED_COMMISSION_NOP')
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		}
	}
}