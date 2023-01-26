import axios from "axios";

import { API_URL } from "./http-common";

// const API_URL = "http://localhost:8080/api/auth/";

class AuthService {

  forgetPassword(email)
  {
    return axios.post(API_URL + "/auth/forgot-pass",{email:email});
  }
  reinitialisationCode(email,code)
  {
    return axios.post(API_URL + "/auth/check-code",{email:email,code:code});
  }
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

  isAdmin() {
    return axios.get(API_URL + "/auth/userrole/")
  }

  RefreshToken(identifiant) {
    return axios
      .get(API_URL + "/auth/refresh/" + identifiant)
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
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

  registerAdmin(username, email, password,isAdmin=true) {
    return axios.post(API_URL + "/auth/admin/register", {
      username,
      email,
      password,
      isAdmin
    });
  }

  // register(data) {
  //   return axios.post(API_URL + "/auth/register", data);
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }


  loginWithSocial(data) {

    return axios.post(API_URL + "/auth/loginbysociallink", data);

  }
}

export default new AuthService();
