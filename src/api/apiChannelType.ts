import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const apiChannelType = axios.create({
  baseURL: baseURL,
});

export const getChannelTypeData = async () => {
  const { data } = await apiChannelType.get("/channeltype/channeltype");
  console.log("data channel type", data);
  return data;
};

// todo add interceptor to handle errors

apiChannelType.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});
