import axios from "axios";
import BACKEND_URL from "../utils/config";

const baseURL = `${BACKEND_URL}/api/v1`;

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

const protectedInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000,
  withCredentials: true,
});

export { instance, protectedInstance };
