import request from "../../utils/request";

export default {
    state: {
        complaintList: []
    },

    getters: {},

    mutations: {
        SET_COMPLAINT_LIST: (state, payload) => {
            state.complaintList = payload.complaintList
        },
    },

    actions: {
        async GET_COMPLAINT_LIST({ commit }) {
            return new Promise((resolve, reject) => {
                request({
                    url: 'inform/',
                    method: 'get'
                }).then(response => {
                    const info = []
                    for (let i = 0; i < response.length; i++) {
                        const m = response[i]
                        info.push({
                            user: m.user,
                            to_user: m.to_user,
                            authority: m.authority,
                            create_time: m.create_time,
                            reason: m.reason,
                            key: m.id
                        })
                    }
                    commit('SET_COMPLAINT_LIST', {
                        complaintList: info
                    })
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}