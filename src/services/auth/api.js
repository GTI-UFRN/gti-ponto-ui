import axios from 'axios'

const baseApi = 'http://localhost:3000/'

axios.defaults.baseURL = baseApi

const api = {
  getToken(username, password) {
    return axios.post('/auth/token', {
      username,
      password
    })
  }
}

export default api