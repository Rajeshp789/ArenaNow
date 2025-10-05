import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/PublicStack/HomeScreen";
import LoginScreen from "../screens/AuthStack/LoginScreen";
import RegisterScreen from "../screens/AuthStack/RegisterScreen";

export default function PublicStack() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}