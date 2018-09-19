import axios from 'axios'

const baseURL = 'http://localhost:3000/ponto'

export default axios.create({
  baseURL,
})
