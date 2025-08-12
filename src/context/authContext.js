import React, { createContext, useContext, useState } from "react";

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

    const Logout = () => {
        try {

        } catch (error) {

        }
    }
    return (
        <AuthContext.Provider value={Login}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext); 
