import instance from '../auth/instace'

function getAll () {
  return instance.get('/users')
}

function update (user) {
  return instance.put(`/users/${user._id}`, user)
}

function create (user) {
  return instance.post('/users', user)
}

export default { create, getAll, update }
