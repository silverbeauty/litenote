import axios from 'axios'
import store from '../store'
import { API_URL } from '../config/config'

const Api = {

  install (Vue, options) {
    this.store = 1
  },

  getMerchant () {
    return axios.get(this._url('merchant/first'),
      {
        headers: this._headers()
      }).then((response) => {
        return this._responseData(response)
      }).catch((e) => {
        console.log("e = ", e);
        return this._responseError(e)
      })
  },

  getRecommendProduct() {
    return axios.get(this._url('merchant/get_recommend_product'),
      {
        headers: this._headers()
      }).then((response) => {
        return this._responseData(response)
      }).catch((e) => {
        console.log("e = ", e);
        return this._responseError(e)
      })
  },

  
  //////////////////////////////////////////////////////////////////////   
  //////////////////// Login API. //////////////////////////////////////
  //////////////////////////////////////////////////////////////////////   

  loginMerchant (email, password) {
    const data = {
      email: email,
      password: password
    }
    return axios.post(this._url('user/login'), data,
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

}

export default Api
