import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

export const apiSourceMedia = axios.create({
  baseURL: baseURL,
});

// export const getSourceMediaData = async () => {
//   const { data } = await apiSourceMedia.get("/sourcemedia/sourcemedia");
//   console.log("data source media", data);
//   return data;
// };

// todo add interceptor to handle errors

apiSourceMedia.interceptors.request.use((config: any) => {
  config.headers = {
    ...config.headers,
    "x-token": localStorage.getItem("token") || "",
  };

  return config;
});
