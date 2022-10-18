import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const apiStrategy = axios.create({
  baseURL: baseURL,
});

export const getStrategyData = async () => {
  const { data } = await apiStrategy.get("/strategy/strategy");
  console.log("data strategy", data);
  return data;
};

// todo add interceptor to handle errors

apiStrategy.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});
