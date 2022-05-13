import request from "../../utils/request";

export default {
    state: {
        typeCommissionDetailInfo: {},
    },
    mutations: {
        SET_TYPE_COMMISSION_DETAIL: (state, payload) => {
            let info = payload.typeCommissionDetailInfo
            state.typeCommissionDetailInfo = {
                typeId: info.id,
                name: info.name,
                photo: 'http://114.116.215.100:443/' + info.image,
                hasPhoto: info.photo != '',
            }
        },
        TYPE_COMMISSION_DEL: () => {

        },
        TYPE_COMMISSION_CHANGE: () => {

        },
        TYPE_COMMISSION_ADD: () => {

        },
    },
    actions: {
        GET_TYPE_COMMISSION_DETAIL: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'commission/sort/' + payload.typeId + '/',
                    method: 'get',
                    data: {
                        id : payload.typeId
                    }
                }).then(response => {

                    commit('SET_TYPE_COMMISSION_DETAIL', {
                        typeCommissionDetailInfo: response
                    })
                    console.log(response.data)
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        DEL_TYPE_COMMISSION: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'commission/sort/' + payload.typeId + '/',
                    method: 'delete',
                    data: {
                        id: payload.typeId,
                    }
                }).then(() => {
                    // console.log(response)
                    commit('TYPE_COMMISSION_DEL')
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        CHANGE_TYPE_COMMISSION: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'commission/sort/' + payload.typeId + '/',
                    method: 'put',
                    data: {
                        id: payload.typeId,
                        name: payload.name,
                        image: payload.photo
                    }
                }).then(() => {
                    // console.log(response)
                    commit('TYPE_COMMISSION_CHANGE')
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },

    }
}