//Tabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons'; // Optional, for icons

// Import your screens
import AccLevelScreen from './components/AccLevelScreen';
import SocketSizeScreen from './components/SocketSizeScreen';
import CompassScreen from './components/CompassScreen';
import CalculatorScreen from './components/CalculatorScreen';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: { backgroundColor: "#222" },
          tabBarActiveTintColor: "#00ff00",
          tabBarInactiveTintColor: 'gray',
        }}
      >
        {/* Home Tab */}
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
        
        {/* AccLevel Tab */}
        <Tab.Screen
          name="Level"
          component={AccLevelScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="checkmark-circle" color={color} size={size} />
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
              <Ionicons name="build" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
          {/* Compass Tab */}
          <Tab.Screen
            name="Compass"
            component={CompassScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="compass" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          {/* Calculator Tab */}
          <Tab.Screen
          name="Calculators"
          component={CalculatorScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calculator" color={color} size={size} />
            ),
            headerShown: false,
          }}
        />
      </Tab.Navigator>
  );
}
