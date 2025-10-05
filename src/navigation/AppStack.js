import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/PublicStack/HomeScreen';
import { Profiler } from 'react';

const Tab = createBottomTabNavigator();

export default function AppStack() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            {/* <Tab.Screen name="Profile" component={} /> */}
        </Tab.Navigator>
    );
}