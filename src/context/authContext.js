import React, { createContext, useContext, useState } from "react";
import AxiosInstance from "../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState(null);

    const Login = async (formData) => {
        try {
            const response = await AxiosInstance.post("/auth/user_Login", formData);
            console.log("Login success:", response.data);

            // Storing refreshToken and accessToken
            if (response.data.AccessToken) {
                await AsyncStorage.setItem("accessToken", response.data.AccessToken);
                setAccessToken(response.data.AccessToken);
            }
            if (response.data.RefreshToken) {
                await SecureStore.setItemAsync("refreshToken", response.data.RefreshToken);
            }

            setIsAuthenticated(true);
            return true;
        } catch (error) {
            throw error;
        }
    }

    const FetchUser = () => {
        try {

        } catch (error) {

        }
    }

    // Logout function
    const Logout = async () => {
        try {

            await AsyncStorage.removeItem("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");

            setIsAuthenticated(false);

            // Navigate user to Login screen 
            resetTo("Login");

        } catch (error) {
            throw error;
        }
    }
    return (
        <AuthContext.Provider value={{ isAuthenticated, accessToken, Login, Logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext); 
