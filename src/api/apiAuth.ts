import axios from "axios";

const baseURL = process.env.REACT_APP_URL;

console.log("baseURL", baseURL);

const authApi = axios.create({
  baseURL: baseURL,
});

// todo add interceptor to handle errors

export default authApi;
