import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AxiosInstance from '../../api/AxiosInstance';
import { useAuth } from '../../context/AuthContext';


export default function HomeScreen({ navigation }) {

    // Getting AuthContext variable
    const { authStatus, Logout } = useAuth();

    console.log(authStatus);

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

                {authStatus === "Guest" ? (
                    < TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={styles.buttonText}> Login </Text>
                    </TouchableOpacity>

                ) : authStatus === "Authenticated"(
                    < TouchableOpacity style={styles.button}
                        onPress={Logout}
                    >
                        <Text style={styles.buttonText}> Logout </Text>
                    </TouchableOpacity>

                )}

                <TouchableOpacity style={styles.button}
                    onPress={apiCall}
                >
                    <Text style={styles.buttonText}> API Call </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}> Register </Text>
                </TouchableOpacity>
            </View >
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
