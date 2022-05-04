import request from "../../utils/request";

export default {
    state: {
        typeCommissionInfo: []
    },
    mutations: {
        SET_TYPE_COMMISSION: (state, payload) => {
            state.typeCommissionInfo = payload.typeCommissionInfo
        }
    },
    actions: {
        GET_TYPE_COMMISSION: ({ commit }) => {
            return new Promise((resolve, reject) => {
                request({
                    url: '/commission/sort/',
                    method: 'get',
                    data: {
                    }
                }).then(response => {
                    const info = []
                    for (let i = 0; i < response.length; i++) {
                        const m = response[i]
                        info.push({
                            typeId: m.id,
                            typeName: m.name,
                            typeImg: m.image,
                            key: m.id
                        })
                    }
                    commit('SET_TYPE_COMMISSION', {
                        typeCommissionInfo: info
                    })
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}