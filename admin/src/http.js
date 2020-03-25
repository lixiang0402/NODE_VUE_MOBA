import axios from 'axios'
import Vue from 'vue'
import router from './router'
const http = axios.create({
    baseURL: "http://localhost:3000/admin/api"
})
http.interceptors.request.use(function(config) {
    console.log(localStorage.token)
    if (localStorage.token) {
        console.log(1)
        config.headers.Authorization = "Bearer " + (localStorage.token || '')
    }
    return config;
});

http.interceptors.response.use(res => {
    return res
}, err => {
    if (err.response.data.message) {
        Vue.prototype.$message.error(err.response.data.message)
        console.log(err.response)
        if (err.response.status == 401) {
            router.push('/login')
        }
    }
    return Promise.reject(err)
})
export default http