import React from 'react';
import { View, Text, Button } from 'react-native';
import { EXPO_API_BACKEND_URL } from '@env';
export default function HomeScreen({ navigation }) {
    
    console.log(EXPO_API_BACKEND_URL);
    
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
};