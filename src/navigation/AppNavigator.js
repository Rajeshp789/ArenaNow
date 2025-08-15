import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    const { isAuthenticated } = useAuth();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            {isAuthenticated ? (
                <Stack.Screen name="Main" component={AuthStack} />
            ) : (
                <Stack.Screen name="Main" component={AuthStack} />
            )}
        </Stack.Navigator>
    )
}