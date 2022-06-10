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
                    console.log(response)
                    commit('SET_COMPLAINT_LIST', {
                        complaintList: response
                    })
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        },
    }
}