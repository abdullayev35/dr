import axios from "axios"

const baseURL = '94.20.88.137:9050/'

const instance = axios.create({
    baseURL
})

instance.interceptors.response.use((res) => {
    const data = res?.data?.data
    if (data?.defaultLanguage && !localStorage.getItem('lang')) {
        localStorage.setItem('lang', data.defaultLanguage);
    }

    return data
})

instance.interceptors.request.use((config) => {
    config.headers.lang = localStorage.getItem('lang')
    return config
})

export default instance