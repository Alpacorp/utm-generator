import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const apiTypeAd = axios.create({
  baseURL: baseURL,
});

export const getApiBusinessData = async () => {
  const { data } = await apiTypeAd.get("/businessline/businesslines");
  return data;
};

// todo add interceptor to handle errors

apiTypeAd.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});
