import axios from "axios";

const API_URL = "https://node152605-jakor-mongo-node.jelastic.metropolia.fi/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "login", {
        "username": username,
        "password": password
      })
      .then(response => {
        console.log(response.data);

        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    return axios.post(API_URL + "register", {
      "username": username,
      "password": password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
