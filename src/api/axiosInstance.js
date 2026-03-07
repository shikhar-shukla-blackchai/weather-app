import axios from "axios";
import { API_CONFIG } from "@/utils/constants";

const weatherClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: 10000,
  params: {
    appid: API_CONFIG.API_KEY,
  },
});

const geoClient = axios.create({
  baseURL: API_CONFIG.GEO_URL,
  timeout: 10000,
  params: {
    appid: API_CONFIG.API_KEY,
  },
});

function parseErrorMessage(error) {
  if (!error.response) {
    return "Network error. Please check your connection and try again.";
  }
  const { status } = error.response;
  if (status === 401) return "API configuration error. Please contact support.";
  if (status === 404) return "City not found. Try a different name.";
  if (status === 429) return "Too many requests. Please wait a moment and try again.";
  if (status >= 500) return "Weather service is temporarily unavailable. Please try later.";
  return "Something went wrong. Please try again.";
}

weatherClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = parseErrorMessage(error);
    return Promise.reject(new Error(message));
  }
);

geoClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = parseErrorMessage(error);
    return Promise.reject(new Error(message));
  }
);

export { weatherClient, geoClient };
