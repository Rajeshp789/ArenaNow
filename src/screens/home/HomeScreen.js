import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { EXPO_API_BACKEND_URL } from '@env';
import AxiosInstance from '../../api/axiosInstance';

export default function HomeScreen({ navigation }) {
    const apiCall = async () => {
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
            <View style={styles.container}>
                <Text style={styles.homeTitle}>Home Screen</Text>
                <TouchableOpacity style={styles.button}
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}> Login </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    title="SECURE API CALL"
                    onPress={apiCall}
                >
                    <Text style={styles.buttonText}> API Call </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    title="SECURE API CALL"
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}> Register </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

// Style Classes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    homeTitle: {
        fontSize: 35,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        height: 45,
        width: 250,
        borderWidth: 1.2,
        marginBottom: 10,
        padding: 10,
        borderRadius: 7
    },
    button: {
        width: 110,
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }

});
