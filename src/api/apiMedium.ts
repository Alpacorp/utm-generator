import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const apiMedium = axios.create({
  baseURL: baseURL,
});

// export const getMediumData = async () => {
//   const { data } = await apiMedium.get("/medium/medium");
//   return data;
// };

// todo add interceptor to handle errors

apiMedium.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});
