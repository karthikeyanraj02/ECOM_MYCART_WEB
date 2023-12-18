import axios, { isAxiosError } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3050/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export { isAxiosError };

export default instance;
