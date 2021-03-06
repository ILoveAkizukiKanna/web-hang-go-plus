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
                photo: 'https://marfr1.2022martu1.cn/' + info.image,
                hasPhoto: info.image != '',
            }
        },
        TYPE_COMMISSION_DEL: () => {

        },
        TYPE_COMMISSION_CHANGE: () => {

        }
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
                    resolve(true)
                }).catch(err => {
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