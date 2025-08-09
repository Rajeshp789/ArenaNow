import axios from "axios";
import { EXPO_API_BACKEND_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigation/NavigationService';

const AxiosInstance = axios.create({
  baseURL: EXPO_API_BACKEND_URL,
  withCredentials: true
});

// Request interceptor
AxiosInstance.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
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
      navigate('Login'); // 🚀 Automatically go to login screen
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
