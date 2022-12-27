import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./http-common";

// const API_URL = 'http://localhost:8080/api/test/';

class TicketService{
  getAllTicket() {
    return axios.get(API_URL + "/ticket", { headers: authHeader() });
  }
  getUserTicket(identifiant) {
    return axios.get(API_URL + "/user/" + identifiant, {
      headers: authHeader(),
    });
  }

  addUserTicket() {
    return axios.post(API_URL + "/ticket", { headers: authHeader() });
  }
  deleteUserTicket(identifiant) {
    return axios.delete(API_URL + "/ticket/" + identifiant, {
      headers: authHeader(),
    });
  }

  updateUserTicket(identifiant) {
    return axios.put(API_URL + "/ticket/" + identifiant, {
      headers: authHeader(),
    });
  }
}

export default new TicketService();
