import request from "../../utils/request";

export default {
    state: {
        typeTopicInfo: []
    },
    mutations: {
        SET_TYPE_TOPIC: (state, payload) => {
            state.typeTopicInfo = payload.typeTopicInfo
        },
        TYPE_TOPIC_ADD: () => {

        }
    },
    actions: {
        GET_TYPE_TOPIC: ({ commit }) => {
            return new Promise((resolve, reject) => {
                request({
                    url: '/topic_types/',
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
                    commit('SET_TYPE_TOPIC', {
                        typeTopicInfo: info
                    })
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        ADD_TYPE_TOPIC: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'topic_types/',
                    method: 'post',
                    data: {
                        name: payload.name,
                        image: payload.photo
                    }
                }).then(() => {
                    // console.log(response)
                    commit('TYPE_TOPIC_ADD')
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
    }
}