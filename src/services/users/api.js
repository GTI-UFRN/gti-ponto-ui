import instance from '../auth/instace'

function getAllUsers () {
  return instance.get('/users')
}

export default { getAllUsers }
