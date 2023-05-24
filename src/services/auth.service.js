import axios from "axios";

const API_URL = "http://localhost:4000/users/";

class AuthService {
  login(Email, Password) {
    return axios
      .post(API_URL + "authenticate/", {
        Email,
        Password,
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem(
            "userDataValidation",
            JSON.stringify(response.data)
          );
        }

        return response.data;
      });
  }
}

export default new AuthService();
