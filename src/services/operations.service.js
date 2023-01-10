import axios from "axios";
import { API_URL } from "./http-common";

// const API_URL = 'http://localhost:8080/api/test/';

class OperationService {

  getAllOperations() {
    // return axios.get(API_URL + "/operations/user/" + identifiant);
    return axios.get(API_URL + "/operations" );
  }

  getUserOperation() {
    // return axios.get(API_URL + "/operations/user/" + identifiant);
    return axios.get(API_URL + "/operations/user" );
  }

  getUserOperationDetails() {
    // return axios.get(API_URL + "/operations/user/" + identifiant);
    return axios.get(API_URL + "/operations/details" );
  }

  addUserOperation(data) {
    return axios.post(API_URL + "/operations",data);
  }

}

export default new OperationService();
