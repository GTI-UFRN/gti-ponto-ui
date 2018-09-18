import instance from './instace' 

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

const api = {
  getUserStatus(userId) {
    return instance.get('/times/'+userId)
  },
  checkin(userId) {
    return instance.post('/times/checkin', { userId })
  },
  checkout(userId) {
    return instance.post('/times/checkout', { userId })
  }
}

export default api