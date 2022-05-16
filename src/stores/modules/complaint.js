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
                    console.log(response)
                    const info = {
                        id: response.id,
                        user :{
                            id : response.user.id,
                            nickName : response.user.nickName,
                            avatarUrl : 'https://marfr1.2022martu1.cn' + response.user.avatarUrl,
                        },
                        to_user :{
                            id : response.to_user.id,
                            nickName : response.to_user.nickName,
                            avatarUrl : 'https://marfr1.2022martu1.cn' + response.to_user.avatarUrl,
                        },
                        authority: response.authority,		//注意！！！ 不是字符串，0、1、2、3分别表示发布话题、发布评论、发布委托、接取委托权限
                        create_time: response.create_time,
                        reason: response.reason,
                    }

                    commit('SET_COMPLAINT_INFO', {
                        complaintInfo: info
                    })
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