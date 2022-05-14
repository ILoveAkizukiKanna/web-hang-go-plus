import axios from "axios";

const request = axios.create({
	// API 请求的默认前缀
	baseURL: 'https://marfr1.2022martu1.cn/api/',
	withCredentials: true,
	timeout: 6000 // 请求超时时间
})

request.interceptors.request.use(config => {
	const token = localStorage.getItem('user-token')
	const url = config.url
	if (token && url !== 'web_auth/') {
		config.headers['Authorization'] = 'Token ' + token
	}
	return config
})

request.interceptors.response.use((response) => {
	return response.data
})

export default request

