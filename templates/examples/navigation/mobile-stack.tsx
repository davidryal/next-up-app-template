import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Placeholder screens for demonstration purposes
const HomeScreen = () => <div>Home Screen</div>;
const DashboardScreen = () => <div>Dashboard Screen</div>;
const ProfileScreen = () => <div>Profile Screen</div>;

const Stack = createStackNavigator();

export function MobileStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
