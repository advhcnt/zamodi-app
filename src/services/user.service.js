import axios from 'axios';
import { API_URL } from './http-common';

// const API_URL = 'http://localhost:8080/api/test/';

class UserService {

  getUserData() {
    return axios.get(API_URL + '/client');
  }

  addAvis() {
    return axios.post(API_URL + '/user',)
  }

  updateUser(identifiant, data) {
    return axios.put(API_URL + '/client/' + identifiant, data)
  }


  changeImage(file) {
    return axios.post(API_URL + '/client/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }}
      )
  }




}

export default new UserService();