export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("userDataValidation"));
  if (user && user.token) {
    return { Authorization: "Token " + user.token };
  } else {
    return {};
  }
}
