import request from "../../utils/request";

export default {
	state: {
		authInfo:{},
	},
	mutations: {
		SET_AUTH: (state, payload) => {
			let info = payload.authInfo
			state.authInfo = {
				id: info.id,
				name: info.nickName,
				hasPhoto: info.avatarUrl == '' ? false : true,
				avatarUrl: info.avatarUrl,
				releaseTopic: info.authority[0],
				releaseComment: info.authority[1],
				releaseCommission: info.authority[2],
				acceptCommission: info.authority[3],
			}
		},
		AUTH_NOP: () => {
			
		}
	},
	
	actions: {
		GET_AUTH:({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'users_admin/user_authority/',
					method: 'post',
					data: {
						id : payload.userId
					},
				}).then(response => {
					console.log(response)
					commit('SET_AUTH', {
						authInfo: response
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})	
		},
		CHANGE_AUTH: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'users_admin/change_authority/',
					method: 'post',
					data: {
						authority: payload.bit,
						id: payload.userId,
					}
				}).then(() => {
					// console.log(response)
					commit('AUTH_NOP')
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		}	
	}
}