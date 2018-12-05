import axios from 'axios'

const baseURL = (process.env.NODE_ENV === 'development') ? 'http://10.77.0.11:3000' : 'http://10.77.0.11:3000/'

export default axios.create({
  baseURL
})
