import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./AuthStack";
import { useAuth } from "../context/AuthContext";
import AppStack from "./AppStack";
import PublicStack from "./PublicStack";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

    const { authStatus } = useAuth();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            {authStatus === "Guest" ? (
                <Stack.Screen name="Public" component={PublicStack} />
            ) : authStatus === "Authenticating" ? (
                <Stack.Screen name="Auth" component={AuthStack} />
            ) : (
                <Stack.Screen name="App" component={AppStack} />
            )}
        </Stack.Navigator>
    )
}