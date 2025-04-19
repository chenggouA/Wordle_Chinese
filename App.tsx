// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ChangelogScreen from './src/screens/ChangelogScreen';
import { useAutoUpdate } from './src/hooks/useAutoUpdate';

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  Changelog: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  useAutoUpdate();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ title: '猜词游戏' }} />
        <Stack.Screen name="Changelog" component={ChangelogScreen} options={{ title: '更新日志' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
