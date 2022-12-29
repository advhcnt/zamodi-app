import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./http-common";

// const API_URL = 'http://localhost:8080/api/test/';

class UserService {
  getAllAvis() {
    return axios.get(API_URL + "/avis");
  }
  getUserAvis(identifiant) {
    return axios.get(API_URL + "/user/" + identifiant, {
      headers: authHeader(),
    });
  }

  addUserAvis(data) {
    return axios.post(API_URL + "/avis",data);
  }

  deleteUserAvis(identifiant) {
    return axios.delete(API_URL + "/avis/" + identifiant, {
      headers: authHeader(),
    });
  }

  updateUserAvis(identifiant) {
    return axios.put(API_URL + "/avis/" + identifiant, {
      headers: authHeader(),
    });
  }
}

export default new UserService();
