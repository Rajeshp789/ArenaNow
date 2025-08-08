import { CommonActions } from "@react-navigation/native";
import React from "react";
import { TextInput, View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";


export default function LoginScreen({ navigation }) {
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.loginTitle}> Login </Text>
                <TextInput style={styles.input}
                    placeholder="Enter Email"
                />
                <TextInput style={styles.input}
                    inputMode="text"
                    placeholder="Enter Password"
                />

                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'Home' }],
                        })
                    )}
                >
                    <Text style={styles.buttonText}>Button</Text>
                </TouchableOpacity>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10
    },
    input: {
        height: 40,
        width: 250,
        // borderColor: 'gray',
        borderWidth: 1.2,
        marginBottom: 10,
        padding: 10,
        borderRadius: 7
    },
    button: {
        width:110,
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
