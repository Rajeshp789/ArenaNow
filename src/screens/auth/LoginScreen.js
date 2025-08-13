import React, { useState } from "react";
import { TextInput, View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { resetTo } from "../../navigation/NavigationService";
import { useAuth } from "../../context/authContext";

export default function LoginScreen({ navigation }) {

    // Getting AuthContext functions
    const { Login } = useAuth();

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

    // Validation function for validatiing fields
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

    // Submit Function
    const handleSubmit = async () => {

        // Validation function call
        const errors = validateFields();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        console.log(formData);

        // API call from authContext
        try {
            await Login(formData);

            // Navigate to home
            resetTo('Home');
        }
        catch (error) {
            console.log("Login Failed", error);
        }
    }

    return (
        <>
            {/* Login Fields */}
            <View style={styles.container}>
                <Text style={styles.loginTitle}> Login </Text>
                <TextInput style={styles.input}
                    placeholder="Enter Email"
                    value={formData.loginEmail}
                    onChangeText={(text) => handleInput('loginEmail', text)}
                />
                {errors.loginEmail && <Text style={styles.errorText}>{errors.loginEmail}</Text>}

                <TextInput style={styles.input}
                    inputMode="text"
                    keyboardType="password"
                    placeholder="Enter Password"
                    value={formData.loginPassword}
                    onChangeText={(text) => handleInput('loginPassword', text)}
                />
                {errors.loginPassword && <Text style={styles.errorText}>{errors.loginPassword}</Text>}

                <TouchableOpacity style={styles.button}
                    onPress={() => resetTo('Home')}
                >
                    <Text style={styles.buttonText}>Button</Text>
                </TouchableOpacity>

                {/* Calling submit function */}
                <TouchableOpacity style={styles.button}
                    onPress={handleSubmit}
                >
                    <Text style={styles.buttonText}>Login</Text>
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
    loginTitle: {
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
    },
    errorText: {
        color: '#f5174eff',
        fontWeight: 'bold'
    }

});
