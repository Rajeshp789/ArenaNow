import axios from "axios";
import { EXPO_API_BACKEND_URL, LOGIN_SERVICES_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate, resetTo } from '../navigation/NavigationService';
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
  const refreshToken = await SecureStore.getItemAsync("refreshToken");
  if (refreshToken) {
    config.headers['x-refresh-token'] = refreshToken;
  }
  return config;
});

// Response interceptor
AxiosInstance.interceptors.response.use(
  async (response) => {
    const token = response.headers['authorization'];
    if (token) {
      const realToken = token.split(' ')[1];
      await AsyncStorage.setItem("accessToken", realToken);
    }
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem("accessToken");
      await SecureStore.deleteItemAsync("refreshToken");
      resetTo('Login') // Automatically go to login screen
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
