import instance from '../auth/instace' 

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const api = {
  getUserStatus(userId) {
    return instance.get('/ponto/times/'+userId)
  },
  checkin(userId) {
    return instance.post('/ponto/times/checkin', { userId })
  },
  checkout(_id) {
    return instance.post('/ponto/times/checkout', { _id })
  },
  getMirror(userId, range) {
    return instance.get(`/ponto/times/mirror/${userId}/${9}`, {params: { range }})
  }
}

export default api