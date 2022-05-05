import request from "../../utils/request";

export default {
	state: {
		topicInfo: {},
		comments: []
	},
	mutations: {
		SET_TOPIC: (state, payload) => {
			let info = payload.topicInfo
			state.topicInfo = {
				id: info.id,
				name: info.name,
				startTime: info.create_at,
				like: info.like,
				follow: info.follow,
				user: info.create_user.nickName,
				description: info.description,
				photo: 'http://114.116.215.100:443' + info.photo,
				hasPhoto: info.photo !== '',
				type: info.topic_type.name
			}
		},
		SET_TCOMMENTS: (state, payload) => {
			state.comments = payload.comments
		},
		CLEAR_TCOMMENT: () => {

		},
		TOPIC_NOP: () => {
		
		}
	},
	actions: {
		GET_TOPIC: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'topic/' + payload.topicId + '/',
					method: 'get',
					data: {
						
					}
				}).then(response => {

					commit('SET_TOPIC', {
						topicInfo: response
					})
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		},
		GET_TCOMMENTS: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: 'comment_topic/' + payload.topicId + '/',
					method: 'get'
				}).then(response => {
					const comments = []
					for (let i = 0; i < response.length; i++) {
						const m = response[i]
						comments.push({
							commentId: m.id,
							author: m.user.nickName,
							avatar: m.user.avatarUrl,
							content: m.comment_content,
							datetime: m.comment_time
						})
					}
					console.log(comments)
					commit('SET_TCOMMENTS', {
						comments: comments
					})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		DELETE_TCOMMENT: ({ commit }, payload) => {
			// console.log(payload);
			return new Promise((resolve, reject) => {
				request({
					url: '/topic_comment/' + payload.commentId + '/',
					method: 'delete'
				}).then(() => {
					commit('CLEAR_COMMENT')
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		NOT_PASS_TOPIC: ({ commit }, payload) => {
			return new Promise((resolve, reject) => {
				request({
					url: '/topic/' + payload.topicId + '/',
					method: 'put',
					data: {
						audit: 2,
						msg: payload.reason
					}
				}).then(() => {
					commit('TOPIC_NOP')
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		}
	}
}