import axios from "axios";

import { API_URL } from "./http-common";

// const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/auth/login", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/auth/register", {
      username,
      email,
      password,
    });
  }

  // register(data) {
  //   return axios.post(API_URL + "/auth/register", data);
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }


  loginWithSocial(data){

    return axios.post(API_URL + "/auth/loginbysociallink",data);

  }
}

export default new AuthService();
