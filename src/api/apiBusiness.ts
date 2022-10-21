import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const apiBusiness = axios.create({
  baseURL: baseURL,
});

// todo add interceptor to handle errors

apiBusiness.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});
