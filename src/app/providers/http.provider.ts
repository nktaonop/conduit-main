import axios from "axios";
import { getItem } from "@/app/helpers/storage.helpers";
import { AUTH_TOKEN_KEY } from "@/app/constants/common.constants";

const http = axios.create();
const httpClient = axios.create();

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT;
let baseUrl: string;

if (environment === "production") {
  baseUrl = "https://api.realworld.io/api";
} else if (environment === "staging") {
  baseUrl = "https://api.realworld.io/api";
} else {
  baseUrl = "https://api.realworld.io/api";
}

http.interceptors.request.use((config) => {
  config.baseURL = baseUrl;
  return config;
});

httpClient.interceptors.request.use((config) => {
  if (getItem(AUTH_TOKEN_KEY)) {
    config.headers["Authorization"] = `Token ${getItem(AUTH_TOKEN_KEY)}`;
  }
  config.baseURL = baseUrl;
  return config;
});

export { http, httpClient };
