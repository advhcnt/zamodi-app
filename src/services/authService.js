import axios from "axios";

import { API_URL } from "./http-common";

// const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  deleteAccount() {
    return axios.get(API_URL + "/auth/delete-account");
  }
  forgetPassword(email) {
    return axios.post(API_URL + "/auth/forgot-pass", { email: email });
  }

  reinitialisationCode(email, code) {
    return axios.post(API_URL + "/auth/check-code", {
      email: email,
      code: code,
    });
  }

  NewPassword(code, email, newPassword, confirmPassword) {
    return axios.post(API_URL + "/auth/new-password", {
      code: code,
      email: email,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    });
  }

  login(email, password) {
    return axios
      .post(API_URL + "/auth/login", { email, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }

  isAdmin() {
    return axios.get(API_URL + "/auth/userrole/");
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
    localStorage.clear();
    return axios.get(API_URL + "/logout");
  }

  register(username, email, password) {
    return axios.post(API_URL + "/auth/register", {
      username,
      email,
      password,
    });
  }

  registerAdmin(username, email, password, isAdmin = true) {
    return axios.post(API_URL + "/auth/admin/register", {
      username,
      email,
      password,
      isAdmin,
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

  authWithGoogle(data, provider) {
    return axios
      .post(API_URL + "/auth/google", { data, provider })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        console.log(response.data);
        return response.data;
      });
  }
}

export default new AuthService();
