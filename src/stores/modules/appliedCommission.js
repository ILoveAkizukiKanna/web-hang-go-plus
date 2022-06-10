import request from "../../utils/request";

export default {
	state: {
		appliedCommissionInfo: []
	},
	mutations: {
		SET_APPLIED_COMMISSION: (state, payload) => {
			state.appliedCommissionInfo = payload.appliedCommissionInfo
		}
	},
	actions: {
		GET_APPLIED_COMMISSION: ({ commit }) => {
			return new Promise((resolve, reject) => {
				request({
					url: '/commission/search/all/Admin',
					method: 'get',
					data: {
					}
				}).then(response => {
					const info = []
					for (let i = 0; i < response.length; i++) {
						const m = response[i]
						info.push({
							commissionId: m.id,
							commissionName: m.name,
							commissionTime: m.start_time + '-' + m.end_time,
							isReal: m.real_time == 1 ? '是' : '否' ,
							key: m.id
						})
					}
					commit('SET_APPLIED_COMMISSION', {
						appliedCommissionInfo: info
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}