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
      instance.defaults.headers.common['Authorization'] = 'Bearer ' + data.token
      return parseJwt(data.token)
    } catch (error) {
      throw error
    }
  },
  getUser (id) {
    return instance.get('/users/' + id)
  }
}

export default api
