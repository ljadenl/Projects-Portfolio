// HomeScreen.tsx
import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";


export default function HomeScreen({ navigation }) {
  return (
      <View style={styles.container}>

        
      <Text style={styles.title}> Welcome, Choose a Feature to Get Started 👋!</Text>
      <Text style={styles.title}> Come back to Reset Features!</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Level')}
      >
        <Text style={styles.buttonText}>  Level </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Socket Size')}
      >
        <Text style={styles.buttonText}> Socket Size Converter </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Compass')}
      >
        <Text style={styles.buttonText}> Compass </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Calculators')}
      >
        <Text style={styles.buttonText}> Calculators </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#d9d9d9"
  },

  title: {
    fontSize: 20,
    alignContent: "center",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#4b8f52",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
