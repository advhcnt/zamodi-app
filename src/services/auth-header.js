import axios from "axios";

// export default function authHeader(token) {
export default function authHeader(token) {
  console.log(token)
  if (token) {
    // return { Authorization: 'Bearer ' + user.accessToken };
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }
}