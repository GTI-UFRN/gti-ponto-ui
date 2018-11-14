import instance from '../auth/instace'

const api = {
  getUserStatus (userId) {
    return instance.get('/ponto/times/' + userId)
  },
  checkin (userId) {
    return instance.post('/ponto/times/checkin', {
      userId
    })
  },
  checkout (_id) {
    return instance.post('/ponto/times/checkout', {
      _id
    })
  },
  getMirror (userId, range) {
    return instance.get(`/ponto/times/mirror/${userId}/${9}`, {
      params: {
        range
      }
    })
  },
  async getServerTime (id) {
    try {
      const {
        data
      } = await instance.get('/')
      return data.time
    } catch (error) {
      throw error
    }
  }
}

export default api
