// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // 图标库

import HomeScreen from './src/screens/HomeScreen';
import GameScreen from './src/screens/GameScreen';
import ChangelogScreen from './src/screens/ChangelogScreen';

import { useAutoUpdate } from './src/hooks/useAutoUpdate';

// 定义底部导航类型
export type BottomTabParamList = {
  Home: undefined;
  Game: undefined;
  Changelog: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function App() {
  useAutoUpdate();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false, // 不显示顶部标题栏
          tabBarActiveTintColor: '#4caf50',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0.5,
            borderTopColor: '#ccc',
          },
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Game':
                iconName = 'game-controller-outline';
                break;
              case 'Changelog':
                iconName = 'document-text-outline';
                break;
              default:
                iconName = 'ellipse-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: '首页' }} />
        <Tab.Screen name="Game" component={GameScreen} options={{ title: '游戏' }} />
        <Tab.Screen name="Changelog" component={ChangelogScreen} options={{ title: '更新日志' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
