//Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'; // Optional, for icons

// Import your screens
import AccCamberScreen from './components/AccCamberScreen';
import SocketSizeScreen from './components/SocketSizeScreen';
import HomeScreen from './index';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: '#222' },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        {/* Home Tab */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        
        {/* CamberLevel Tab */}
        <Tab.Screen
          name="Level"
          component={AccCamberScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkmark-circle-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />

        {/* SocketSize Tab */}
        <Tab.Screen
          name="Socket Size"
          component={SocketSizeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="build-outline" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
  );
}
