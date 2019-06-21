import axios from 'axios'
import store from '../store'
import { API_URL } from '../config/config'

const Api = {

  install (Vue, options) {
    this.store = 1
  },

  getNoteList () {
    return axios.get(this._url('note'),
      {
        headers: this._headers()
      }).then((response) => {
        const {status, data} = response
        if(status){
          return this._responseData(data)
        }else{
          return this._responseError(e)
        }
        
      }).catch((e) => {
        console.log("e = ", e);
        return this._responseError(e)
      })
  },

  getNote(id) {
    return axios.get(this._url('note/'+id),
      {
        headers: this._headers()
      }).then((response) => {
        return this._responseData(response)
      }).catch((e) => {
        console.log("e = ", e);
        return this._responseError(e)
      })
  },

  postNote (title, content) {
    const data = {
      title: title,
      content: content
    }
    return axios.post(this._url('note'), data,
      {
        headers: this._headers()
      }).then((response) => {
        return this._responseData(response).then((data) => {
          return Promise.resolve(data)
        })
      }).catch((e) => {
        return this._responseError(e)
      })
  },

  _url (path) {
    return `${API_URL}/${path}`
  },

  _headers () {
    return {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  },

  _responseData (response, transformer) {
    let data = response.data

    if (transformer !== undefined) {
      data = transformer(data)
    }

    return Promise.resolve(data)
  },

  _responseError (error) {
    let e = new Error()
    e.errors = error.response.errors

    return Promise.reject(e)
  }

}

export default Api
