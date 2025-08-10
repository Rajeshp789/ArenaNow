import React from 'react';
import { View, Text, Button } from 'react-native';
import { EXPO_API_BACKEND_URL } from '@env';
import AxiosInstance from '../../api/axiosInstance';

export default function HomeScreen({ navigation }) {
    const apiCall = async() =>{
        try {
            const response = await AxiosInstance.get("/auth/tesAPI");
            console.log(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {/* Home Screen */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login')}
                />
                <Button
                    title="SECURE API CALL"
                    onPress={apiCall}
                />
            </View>
        </>
    );
};