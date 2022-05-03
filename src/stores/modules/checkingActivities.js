import request from "../../utils/request";

export default {
	state: {
		checkingActivitiesInfo: []
	},
	mutations: {
		SET_CHECKING_ACTIVITIES: (state, payload) => {
			state.checkingActivitiesInfo = payload.checkingActivitiesInfo
		}
	},
	actions: {
		GET_CHECKING_ACTIVITIES: ({ commit }) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'condition/activities/',
					method: 'post',
					data: {
						audit_status: [2]
					}
				}).then(response => {
					console.log(response)
					const info = []
					for (let i = 0; i < response.length; i++) {
						const m = response[i]
						info.push({
							activityId: m.id,
							activityName: m.name,
							activityLocation: m.position,
							activityTime: m.normal_activity.start_at + ' - ' + m.normal_activity.end_at,
							key: m.id
						})
					}
					commit('SET_CHECKING_ACTIVITIES', {
						checkingActivitiesInfo: info
					})
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		}
	}
}