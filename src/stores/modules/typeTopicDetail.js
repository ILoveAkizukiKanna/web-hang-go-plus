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
                photo: 'http://114.116.215.100:443/' + info.image,
                hasPhoto: info.photo !== '',
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
                    console.log(response.data)
                    resolve(true)
                }).catch(err => {
                    // console.log(err)
                    reject(err)
                })
            })
        },
        DEL_TYPE_TOPIC: ({ commit }, payload) => {
            return new Promise((resolve, reject) => {
                request({
                    url: 'topic_types/{id}/' + payload.typeId + '/',
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