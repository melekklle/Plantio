import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from "./components/HomeScreen";
import BookScreen from "./components/BookScreen";
import PeopleScreen from "./components/PeopleScreen";
import ScanScreen from "./components/ScanScreen";
import StoreScreen from "./components/StoreScreen";
import MyGarden from "./components/MyGarden";
import MyPlants from "./components/MyPlants";
import ProfileScreen from "./components/ProfileScreen";
import WeatherScreen from "./components/WeatherScreen";
import BookDetailScreen from "./components/BookDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BookScreen" component={BookScreen} />
        <Stack.Screen name="ScanScreen" component={ScanScreen} />
        <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
        <Stack.Screen name="StoreScreen" component={StoreScreen} />
        <Stack.Screen name="MyGarden" component={MyGarden} />
        <Stack.Screen name="MyPlants" component={MyPlants} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="WeatherScreen" component={WeatherScreen} />
        <Stack.Screen name="BookDetailScreen" component={BookDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
