import axios from "axios";
import authHeader from "./auth-header";
import { API_URL } from "./http-common";

// const API_URL = 'http://localhost:8080/api/test/';

class TicketService{
  getAllTicket() {
    return axios.get(API_URL + "/ticket");
  }
  getUserTicket(identifiant) {
    return axios.get(API_URL + "/user/" + identifiant, {
      headers: authHeader(),
    });
  }

  addUserTicket(data) {
    return axios.post(API_URL + "/ticket",data);
  }
  deleteUserTicket(identifiant) {
    return axios.delete(API_URL + "/ticket/" + identifiant);
  }

  updateUserTicket(identifiant,data) {
    return axios.put(API_URL + "/ticket/" + identifiant,data);
  }
}

export default new TicketService();
