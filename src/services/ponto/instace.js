import axios from 'axios'

const baseURL = (process.env.NODE_ENV === 'development') ? 'http://localhost:3000/ponto' : 'http://10.77.0.11:3000/ponto'

export default axios.create({
  baseURL,
})
