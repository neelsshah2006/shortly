import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const API = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

API.interceptors.response.use(
  (response) => {
    if (response.data && response.data.success) {
      return response.data.data;
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data && !error.response.data.success) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default API;
