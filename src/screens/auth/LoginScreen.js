import { CommonActions } from "@react-navigation/native";
import React, { useState } from "react";
import { TextInput, View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";


export default function LoginScreen({ navigation }) {

    // Creating useState variables
    const [formData, setFormData] = useState({
        loginEmail: "",
        loginPassword: ""
    });
    const [errors, setErrors] = useState({});

    // Handling Inputs
    const handleInput = (name, value) => {

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null
            }))
        }
    }

    const validateFields = () => {
        const newErrors = {};

        // Validating fields
        if (!formData.loginEmail) {
            newErrors.loginEmail = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.loginEmail)) {
            newErrors.loginEmail = "Enter a valid email address.";
        }

        if (!formData.loginPassword) {
            newErrors.loginPassword = "Password is required.";
        } else if (formData.loginPassword.length < 6) {
            newErrors.loginPassword = "Password must be at least 6 characters.";
        }

        return newErrors;
    }

    const handleSubmit = () => {

        const errors = validateFields();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        console.log(formData);
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.loginTitle}> Login </Text>
                <TextInput style={styles.input}
                    placeholder="Enter Email"
                    value={formData.loginEmail}
                    onChangeText={(text) => handleInput('loginEmail', text)}
                />
                {errors.loginEmail && <Text>{errors.loginEmail}</Text>}

                <TextInput style={styles.input}
                    inputMode="text"
                    placeholder="Enter Password"
                    value={formData.loginPassword}
                    onChangeText={(text) => handleInput('loginPassword', text)}
                />
                {errors.loginPassword && <Text>{errors.loginPassword}</Text>}

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

                <TouchableOpacity style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>
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
