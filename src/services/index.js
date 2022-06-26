import axios from 'axios'

const baseURL = 'https://6284ab5d6b6c317d5ba7737c.endapi.io'

const instance = axios.create({baseURL, timeout: 5000})

//instance.interceptors.request.use(config => config, error => Promise.reject(error))
instance.interceptors.response.use(config => config, async error => {
    console.log(error)
    return Promise.reject(error)
})

export default instance