import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './http-common';

// const API_URL = 'http://localhost:8080/api/test/';

class UserService {

  getUserData() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }

  addAvis(){
    return axios.post(API_URL + 'user', { headers: authHeader() },)
  }

  
}

export default new UserService();