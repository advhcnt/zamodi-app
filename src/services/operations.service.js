import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./http-common";

// const API_URL = 'http://localhost:8080/api/test/';

class OperationService {


  getUserOperation(identifiant) {
    return axios.get(API_URL + "/operations/user/" + identifiant);
  }

  addUserOperation(data) {
    return axios.post(API_URL + "/operations",data);
  }

}

export default new OperationService();
