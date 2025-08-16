import React, { createContext, useContext, useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authStatus, setAuthStatus] = useState("Guest");
    const [accessToken, setAccessToken] = useState(null);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const restoreSession = async () => {
            const storedAccessToken = await AsyncStorage.getItem("accessToken");
            const storedRefreshToken = await SecureStore.getItemAsync("refreshToken");

            if (storedAccessToken && storedRefreshToken) {
                setAccessToken(storedAccessToken);
                setAuthStatus("Authenticated");
                await FetchUser();
            } else {
                setAuthStatus("Guest");
                setUserData(null);
            }
        };
        restoreSession();
    }, []);

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

            setAuthStatus("Authenticated");
            await FetchUser();
            return true;

        } catch (error) {
            throw error;
        }
    }

    // Fetch Userdata 
    const FetchUser = async () => {
        try {

            const response = await AxiosInstance.get("/auth/fetch_UserData");
            console.log("User data:", response.data);
            setUserData(response.data);
            setAuthStatus("Authenticated")
            return response.data;

        } catch (error) {

            if (error.response?.status === 401) {
                setAuthStatus("Guest");
                setUser(null);
            }

            throw error;
        }
    }

    // Logout function
    const Logout = async () => {
        try {

            await AsyncStorage.removeItem("accessToken");
            await SecureStore.deleteItemAsync("refreshToken");

            setAuthStatus("Guest");
            setUserData(null);
            // Navigate user to Login screen 
            resetTo("Login");

        } catch (error) {
            throw error;
        }
    }
    return (
        <AuthContext.Provider value={{ authStatus, accessToken, userData, Login, Logout, FetchUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext); 
