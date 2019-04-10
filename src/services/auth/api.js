import instance from './instace'

function parseJwt (token) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    return null
  }
}

const api = {
  async getToken (username, password) {
    try {
      const { data } = await instance.post('/auth/token', {
        username,
        password
      })
      this.setToken(data.token)
      const user = parseJwt(data.token)
      user.token = data.token
      return user
    } catch (error) {
      throw error
    }
  },
  setToken (token) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + token
  },
  getUser (id) {
    return instance.get('/users/' + id)
  }
}

export default api
