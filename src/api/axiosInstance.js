import axios from "axios";
import { EXPO_API_BACKEND_URL, LOGIN_SERVICES_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { resetTo } from '../navigation/NavigationService';
import * as SecureStore from 'expo-secure-store';

// Creating AxiosInstance Object
const AxiosInstance = axios.create({
  baseURL: EXPO_API_BACKEND_URL,
  withCredentials: true
});

// Request interceptor
AxiosInstance.interceptors.request.use(async (config) => {

  // Setting Mobile Api key in headers
  config.headers['X-MOBILE-API-KEY'] = LOGIN_SERVICES_API_KEY;

  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

// Response interceptor
AxiosInstance.interceptors.response.use(
  async (response) => {

    return response;
  },
  async (error) => {

    // Copying original request credential
    const originalRequest = error.config;

    console.log("Response", error.response?.status, error.response?.data.message);
    // console.log(error.response);

    if (error.response.data?.message) {
      console.log(error.response.data.message);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Marking this request as retired
      originalRequest._retry = true;

      try {

        // Check for refreshToken
        const refreshToken = await SecureStore.getItemAsync('refreshToken');

        if (!refreshToken) {
          throw new Error("Refresh Token not found");
        }

        // If refreshToken not found then make request for new one
        const refreshResponse = await axios.post(`${EXPO_API_BACKEND_URL}/auth/refresh-token`,
          { refreshToken },
          { headers: { 'x-mobile-api-key': LOGIN_SERVICES_API_KEY } }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        console.log("New Access Token:", newAccessToken);

        // Check for new accessToken
        if (!newAccessToken) throw new Error("No access token in refresh response");

        // Set new accessToken
        await AsyncStorage.setItem("accessToken", newAccessToken);

        // Set new accessToken in request headers
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry request with new token
        return AxiosInstance(originalRequest);

      }
      catch (err) {

        // Removing Token from storages
        await AsyncStorage.removeItem("accessToken");
        await SecureStore.deleteItemAsync("refreshToken");

        // Navigate user to Login screen 
        resetTo("Login");

        // Throwing error to screen so user can see
        return Promise.reject(err);

      }

    }
    // If error is not 401 then reject it

    return Promise.reject(error);
  }
);

export default AxiosInstance;
