import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const apiSourceMedia = axios.create({
  baseURL: baseURL,
});

// todo add interceptor to handle errors

apiSourceMedia.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});
