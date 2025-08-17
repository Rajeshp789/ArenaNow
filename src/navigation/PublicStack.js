import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/PublicStack/HomeScreen";

export default function PublicStack() {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
}