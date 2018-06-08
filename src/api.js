import axios from 'axios';

const HTTP = axios.create({
  baseURL: process.env.baseURL,
  headers: {}
});


export default {
  get (url, config) {
    return HTTP.get(url, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  post (url, data, config) {
    return HTTP.post(url, data, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  put (url, data, config) {
    return HTTP.put(url, data, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  patch (url, data, config) {
    return HTTP.patch(url, data, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  },
  delete (url, config) {
    return HTTP.delete(url, config)
      .then((response) => Promise.resolve(response))
      .catch((error) => Promise.reject(error))
  }
}
