import React from "react";
import { Text, View, Button, StyleSheet } from "react-native";
//import SocketSizeScreen from './components/SocketSizeScreen';
//import AccCamberScreen from './components/AccCamberScreen';



export default function HomeScreen() {
  return (

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <SocketSizeScreen /> */}
      {/* <AccCamberScreen /> */}
      <Text>Welcome, Choose a Tab to Get Started!
      </Text>
    </View>
  );
}
