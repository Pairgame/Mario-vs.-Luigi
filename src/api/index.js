import client from './client'

class Api {
  constructor() {
    this.app = client
  }

  service(serviceName) {
    return this.app.service(serviceNAme)
  }
}

export default API
