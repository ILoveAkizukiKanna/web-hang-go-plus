import request from "../../utils/request";

export default {
	state: {
		checkingActivityInfo: {},
		rejectReason: '无'
	},
	mutations: {
		SET_CHECKING_ACTIVITY: (state, payload) => {
			let info = payload.checkingActivityInfo
			state.checkingActivityInfo = {
				id: info.id,
				name: info.name,
				location: info.position,
				campus: (info.location === 1) ? '学院路' : (info.location === 2) ? '沙河' : '校外',
				signUpStartTime: info.start_enrollment_at,
				signUpStopTime: info.end_enrollment_at,
				startTime: info.normal_activity.start_at,
				stopTime: info.normal_activity.end_at,
				capacity: info.normal_activity.allow_total,
				description: info.normal_activity.description,
				photo: 'https://marfr1.2022martu1.cn/' + info.photo,
				hasPhoto: info.photo !== '',
				type: info.activity_type.name
			}
		},
		CHECKING_ACTIVITY_NOP: () => {

		}
	},
	actions: {
		GET_CHECKING_ACTIVITY: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'activities/' + payload.activityId + '/',
					method: 'get'
				}).then(response => {
					// console.log(response)
					commit('SET_CHECKING_ACTIVITY', {
						checkingActivityInfo: response
					})
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		PASS_CHECK: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'users_admin/permit_activity/',
					method: 'post',
					data: {
						id: payload.activityId
					}
				}).then(() => {
					// console.log(response)
					commit('CHECKING_ACTIVITY_NOP')
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		NOT_PASS_CHECK: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'users_admin/reject_activity/',
					method: 'post',
					data: {
						id: payload.activityId,
						reason: payload.reason
					}
				}).then(() => {
					// console.log(response)
					commit('CHECKING_ACTIVITY_NOP')
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		}
	}
}