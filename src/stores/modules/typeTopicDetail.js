import request from "../../utils/request";

export default {
    state: {
        typeTopicDetailInfo: {},
    },
    mutations: {
        SET_TYPE_TOPIC_DETAIL: (state, payload) => {
            let info = payload.typeTopicDetailInfo
            state.typeTopicDetailInfo = {
                typeId: info.id,
                name: info.name,
                photo: 'https://marfr1.2022martu1.cn/' + info.image,
                hasPhoto: info.image != null,
            }
        },
        TYPE_TOPIC_DEL: () => {

        },
        TYPE_TOPIC_CHANGE: () => {

        }
    },
    actions: {
        GET_TYPE_TOPIC_DETAIL: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'topic_types/' + payload.typeId + '/',
                    method: 'get',
                    data: {
						
                    }
                }).then(response => {

                    commit('SET_TYPE_TOPIC_DETAIL', {
                        typeTopicDetailInfo: response
                    })
                    resolve(true)
                }).catch(err => {
                    reject(err)
                })
            })
        },
        DEL_TYPE_TOPIC: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'topic_types/' + payload.typeId + '/',
                    method: 'delete',
                    data: {
                        id: payload.typeId,
                    }
                }).then(() => {
                    // console.log(response)
                    commit('TYPE_TOPIC_DEL')
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        CHANGE_TYPE_TOPIC: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'topic_types/' + payload.typeId + '/',
                    method: 'put',
                    data: {
                        id: payload.typeId,
                        name: payload.name,
                        image: payload.photo
                    }
                }).then(() => {
                    // console.log(response)
                    commit('TYPE_TOPIC_CHANGE')
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
    }
}