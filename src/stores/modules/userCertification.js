import request from "../../utils/request";

export default {
	state: {
		userInfo: []
	},

	getters: {},

	mutations: {
		SET_USER_INFO: (state, payload) => {
			state.userInfo = payload.userInfo
		},
		NOP: () => {

		}
	},

	actions: {
		GET_USER_INFO: ({ commit }) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'users_admin/',
					method: 'get'
				}).then(response => {
					// console.log(response)
					const userInfo = []
					for (let i = 0; i < response.results.length; i++) {
						const m = response.results[i]
						userInfo.push({
							userId: m.id,
							userName: m.username,
							userEmail: m.email,
							userStudentId: m.student_id,
							userPhone: m.phone,
							userPictureUrl: m.credential
						})
					}
					commit('SET_USER_INFO', {
						userInfo: userInfo
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		PASS_CERTIFICATION: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'users_admin/permit_audit/',
					method: 'post',
					data: {
						id: payload.userId
					}
				}).then(() => {
					// console.log(response)
					commit('NOP')
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		NOT_PASS_CERTIFICATION: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'users_admin/reject_audit/',
					method: 'post',
					data: {
						id: payload.userId
					}
				}).then(() => {
					// console.log(response)
					commit('NOP')
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}