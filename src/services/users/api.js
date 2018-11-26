import instance from '../auth/instace'

function getAll () {
  return instance.get('/users')
}

function update (user) {
  return instance.put(`/users/${user._id}`, user)
}

function setImageProfile (user, file) {
  let formData = new FormData()
  formData.append('profile', file)
  console.log(user)
  formData.append('userId', user._id)
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  }
  return instance.post(`/users/upload`, formData, config)
}

function create (user) {
  return instance.post('/users', user)
}

export default { create, getAll, update, setImageProfile }
