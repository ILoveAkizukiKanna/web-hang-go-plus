import request from "../../utils/request";

export default {
	state: {
		checkedActivitiesInfo: []
	},
	mutations: {
		SET_CHECKED_ACTIVITIES: (state, payload) => {
			state.checkedActivitiesInfo = payload.checkedActivitiesInfo
		}
	},
	actions: {
		GET_CHECKED_ACTIVITIES: ({ commit }) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'condition/activities/',
					method: 'post',
					data: {
						audit_status: [3]
					}
				}).then(response => {
					// console.log(response)
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
					commit('SET_CHECKED_ACTIVITIES', {
						checkedActivitiesInfo: info
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