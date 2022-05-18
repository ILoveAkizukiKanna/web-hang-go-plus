import request from "../../utils/request";

export default {
    state: {
        complaintInfo:{},
    },
    mutations: {
        SET_COMPLAINT_INFO: (state, payload) => {
            state.complaintInfo = payload.complaintInfo
        },
        PASS: () => {

        },
        NOT_PASS: () => {

        }
    },

    actions: {
        GET_COMPLAINT_INFO:({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'inform/' + payload.complaintId + '/',
                    method: 'get',
                    data: {
                    },
                }).then(response => {
                    commit('SET_COMPLAINT_INFO', {
                        complaintInfo: response
                    })
                    console.log(this.state.complaintInfo)
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        PASS_COMPLAINT: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'inform/save/',
                    method: 'delete',
                    data: {
                        id: payload.complaintId,
                    }
                }).then(() => {
                    // console.log(response)
                    commit('PASS')
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        NOT_PASS_COMPLAINT: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'inform/save/',
                    method: 'post',
                    data: {
                        id: payload.complaintId,
                    }
                }).then(() => {
                    // console.log(response)
                    commit('NOT_PASS')
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        }
    }
}