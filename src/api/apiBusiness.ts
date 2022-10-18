import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const apiBusiness = axios.create({
  baseURL: baseURL,
});

export const getBusinessLineData = async () => {
  const { data } = await apiBusiness.get("/businessline/businesslines");
  return data;
};

// todo add interceptor to handle errors

apiBusiness.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});
