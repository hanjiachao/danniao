let means = {
  getToken () {
    const token = localStorage.getItem('token')
    if (token) {
      let tokenObj = JSON.parse(token)
      if (tokenObj.expires_in < new Date().getTime()) {
        return false
      } else {
        return tokenObj.access_token
      }
    } else {
      return false
    }
  },
  setToken (token) {
    if (token === null) {
      localStorage.removeItem('token')
    } else {
      token.expires_in = new Date().getTime() + token.expires_in * 1000
      localStorage.setItem('token', JSON.stringify(token))
    }
  },
}
export default means
