import axios from 'axios';
import authHeader from './auth-header';
import { API_URL } from './http-common';

// const API_URL = 'http://localhost:8080/api/test/';

class UserService {

  getUserData() {
    return axios.get(API_URL + '/user');
  }

  addAvis(){
    return axios.post(API_URL + '/user',)
  }

  updateUser(identifiant,data){
    return axios.put(API_URL + '/client/'+identifiant,data)
  }



  
}

export default new UserService();