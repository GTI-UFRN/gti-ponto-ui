import instance from '../auth/instace'

const api = {
  getAllOpenOccurrences () {
    return instance({
      url: '/ocomon',
      method: 'post',
      data: {
        query: `
          query {
            users {
              user_id
              ocorrenciasEmAberto {
                  numero
                }
              }
          }
          `
      }
    })
  }
}

export default api
