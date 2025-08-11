import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import AxiosInstance from "../../api/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import { resetTo } from "../../navigation/NavigationService";

export default function RegisterScreen({ navigation }) {

    // Declaring state variables
    const [formData, setFormData] = useState({
        userName: '',
        userEmail: '',
        userMobile: '',
        userPassword: ''
    });

    const [errors, setErrors] = useState({});

    // Handling Input
    const handleInput = (name, value) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: null
            }));
        }
    }

    const validateFields = () => {
        const newErrors = {};

        // Username validations
        if (!formData.userName) {
            newErrors.userName = "Username is required";
        }

        // Email validations
        if (!formData.userEmail) {
            newErrors.userEmail = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.userEmail)) {
            newErrors.userEmail = "Enter a valid email address"
        }

        // Mobile number validations
        const mobileCheck = /^[0-9]{10}$/
        if (!formData.userMobile) {
            newErrors.userMobile = "Mobile number is required";
        }
        if (!mobileCheck.test(formData.userMobile)) {
            newErrors.userMobile = "Enter valid mobile number.";
        }

        // Password validations
        const oneUpperCase = /(?=.*[A-Z])/;
        const oneLowerCase = /(?=.*[a-z])/;
        const oneNumber = /(?=.*\d)/;
        const oneSpecialCharacter = /(?=.*?[^A-Za-z0-9])/;
        if (!formData.userPassword) {
            newErrors.userPassword = "Password is required";
        }
        else if (formData.userPassword.length < 8) {
            newErrors.userPassword = "Password must contain at least 8 characters.";
        }
        else if (!oneUpperCase.test(formData.userPassword)) {
            newErrors.userPassword = "Password must contain atleast one uppercase character.";
        }
        else if (!oneLowerCase.test(formData.userPassword)) {
            newErrors.userPassword = "Password must contain one lowercase character.";
        }
        else if (!oneNumber.test(formData.userPassword)) {
            newErrors.userPassword = "Password must contain one number.";
        }
        else if (!oneSpecialCharacter.test(formData.userPassword)) {
            newErrors.userPassword = "Password must contain one special character."
        }

        return newErrors;
    }

    const handleSubmit = async () => {

        // Validation function call
        const errors = validateFields();

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // API call
        try {
            const response = await AxiosInstance.post("/auth/user_Register", formData);
            console.log(response.data);

            // Storing refreshToken and accessToken
            if (response.data.AccessToken) {
                await AsyncStorage.setItem("accessToken", response.data.AccessToken);
            }
            if (response.data.RefreshToken) {
                await SecureStore.setItemAsync("refreshToken", response.data.RefreshToken);
            }

            // Navigate to home
            resetTo('Home');

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={styles.registerTitle}> Register </Text>
                <TextInput style={styles.input}
                    placeholder="Username"
                    value={formData.userName}
                    onChangeText={(text) => handleInput('userName', text)}
                />
                {errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}
                <TextInput style={styles.input}
                    placeholder="E-Mail"
                    value={formData.userEmail}
                    onChangeText={(text) => handleInput('userEmail', text)}
                />
                {errors.userEmail && <Text style={styles.errorText}>{errors.userEmail}</Text>}
                <TextInput style={styles.input}
                    placeholder="Mobile Number"
                    keyboardType="numeric"
                    maxLength={10}
                    value={formData.userMobile}
                    onChangeText={(text) => handleInput('userMobile', text)}
                />
                {errors.userMobile && <Text style={styles.errorText}>{errors.userMobile}</Text>}
                <TextInput style={styles.input}
                    placeholder="Password"
                    value={formData.userPassword}
                    onChangeText={(text) => handleInput('userPassword', text)}
                />
                {errors.userPassword && <Text style={styles.errorText}>{errors.userPassword}</Text>}
                <TouchableOpacity style={styles.button}
                    onPress={handleSubmit}>
                    <Text style={styles.buttonText}> Register </Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

// Style Classes
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerTitle: {
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
