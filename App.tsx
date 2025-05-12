// App.tsx (예시: Stack Navigation 구조)

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';

import HomeScreen from './src/screens/HomeScreen';
import WishWriteScreen from './src/screens/WishWriteScreen';

const Stack = createNativeStackNavigator<RootStackParamList>(); // 타입 추가!

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sona">
        <Stack.Screen name="Sona" component={HomeScreen} />
        <Stack.Screen name="WishWrite" component={WishWriteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
