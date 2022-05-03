import request from "../../utils/request";

export default {
	state: {
		feedback: []
	},

	getters: {},

	mutations: {
		SET_FEEDBACK: (state, payload) => {
			state.feedback = payload.feedback
		},
	},

	actions: {
		async GET_FEEDBACK({ commit }) {
			return new Promise((resolve, reject) => {
				request({
					url: 'feedbacks/',
					method: 'get'
				}).then(response => {
					const feedback = []
					for (let i = 0; i < response.results.length; i++) {
						let {id, user, content, time} = response.results[i]
						const rawTime = new Date(time)
						time = `${rawTime.getFullYear()}-`
							+ `${(rawTime.getMonth() + 1).toString().padStart(2, '0')}-`
							+ `${rawTime.getDate().toString().padStart(2, '0')} `
							+	`${rawTime.getHours().toString().padStart(2, '0')}:`
							+ `${rawTime.getMinutes().toString().padStart(2, '0')}:`
							+ `${rawTime.getSeconds().toString().padStart(2, '0')}`
						feedback.push({id, user, content, time})
					}
					commit('SET_FEEDBACK', {feedback})
					resolve(true)
				}).catch(err => {
					reject(err)
				})
			})
		},
		async HANDLE_FEEDBACK(_, payload) {
			return new Promise((resolve, reject) => {
				request({
					url: `feedbacks/${payload.id}`,
					method: 'delete',
				}).then(() => {
					// console.log(response)
					resolve(true)
				}).catch(err => {
					// console.log(err)
					reject(err)
				})
			})
		}
	}
}