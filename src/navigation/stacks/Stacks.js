import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../scenes/home';
import Profile from '../../scenes/profile';

const Stack = createNativeStackNavigator();

export const HomeNavigator = () => (
    <Stack.Navigator
      initialRouteName="Homen"
      screenOptions={({ route }) => ({
      
        headerShown: false,})}
    >
      <Stack.Screen
        name="Homel"   
        component={Home}
      />
     
    </Stack.Navigator>
  );

  export const ProfileNavigator = () => (
    <Stack.Navigator
      initialRouteName="Profile1"
      screenOptions={({ route }) => ({
      
        headerShown: false,})}
      
    >
      <Stack.Screen
        name="Profiles"
        component={Profile}
      />
     
    </Stack.Navigator>
  );
  
  