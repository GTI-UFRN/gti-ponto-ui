import instance from '../auth/instace'

const api = {
  getUserStatus (userId) {
    return instance.get('/ponto/times/' + userId)
  },
  getTimes (filters) {
    return instance.get('/ponto/times?checkout=' + filters.checkout)
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
  save (time) {
    if (time._id) {
      return instance.patch('/ponto/times/', time)
    } else {
      return instance.post('/ponto/times/', time)
    }
  },
  justificationCheckout (_id, justification, exiatAt) {
    return instance.post('/ponto/times/checkout', {
      _id,
      justification,
      exiatAt
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
