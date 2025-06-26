import isEmail from "validator/lib/isEmail";
import API from "../provider/api.provider";

const registerUser = async (payload) => {
  return await API.post("/auth/local/register", payload);
};

const loginUser = async ({ emailOrUsername, password }) => {
  const payload = isEmail(emailOrUsername)
    ? { email: emailOrUsername, password }
    : { username: emailOrUsername, password };
  return await API.post("/auth/local/login", payload);
};

const checkAuth = async () => {
  return await API.get("/auth/check-auth");
};

const logoutUser = async () => {
  return await API.get("/auth/logout");
};

export { registerUser, loginUser, checkAuth, logoutUser };
