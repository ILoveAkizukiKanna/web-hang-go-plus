import request from "../../utils/request";

export default {
	state: {
		checkedActivityInfo: {},
		comments: []
	},
	mutations: {
		SET_CHECKED_ACTIVITY: (state, payload) => {
			let info = payload.checkedActivityInfo
			state.checkedActivityInfo = {
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
				photo: 'https://marfr1.2022martu1.cn' + info.photo,
				hasPhoto: info.photo !== '',
				type: info.activity_type.name
			}
		},
		SET_COMMENTS: (state, payload) => {
			state.comments = payload.comments
		},
		CLEAR_COMMENT: () => {

		}
	},
	actions: {
		GET_CHECKED_ACTIVITY: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'activities/' + payload.activityId + '/',
					method: 'get'
				}).then(response => {
					// console.log(response)
					commit('SET_CHECKED_ACTIVITY', {
						checkedActivityInfo: response
					})
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		GET_COMMENTS: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'comment_activities/' + payload.activityId + '/',
					method: 'get'
				}).then(response => {
					// console.log(response)
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
					commit('SET_COMMENTS', {
						comments: comments
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		DELETE_COMMENT: ({ commit }, payload) => {
			// console.log(payload);
			return new Promise((resolve, reject) => {
				request({
					url: '/comment/' + payload.commentId + '/',
					method: 'delete'
				}).then(() => {
					commit('CLEAR_COMMENT')
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}