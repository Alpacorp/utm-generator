import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

// console.log("baseURL", baseURL);

const authApi = axios.create({
  baseURL: baseURL,
});

// todo add interceptor to handle errors

authApi.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});

export default authApi;
