import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Accelerometer } from "expo-sensors";

const AccCamberScreen = () => {
    const [angle, setAngle] = useState(0);
    const [tilt] = useState(new Animated.Value(0));
    const [islevel, setIsLevel] = useState(true);
    const [bubbleColor, setBubbleColor] = useState("black");

    useEffect(() => {
        const sub = Accelerometer.addListener((data) => {
          const calcAngle = data.x * 90; // convert to degrees

            setAngle(calcAngle);
            
            const level = Math.abs(calcAngle) < 0.5
            setIsLevel(level);

            setBubbleColor(level ? "green" : "black");
        
            Animated.spring(tilt, {
                toValue: calcAngle * 3,
                useNativeDriver: true,
            }).start();
        });

        Accelerometer.setUpdateInterval(100); // Update every 100ms

    }, []);

    return (    
        <View style={styles.container}>
            <Text style={styles.text}>{angle.toFixed(1)}°</Text>


    {/* Bubble Level Indicator */}
        <Animated.View
          style={[
          styles.bubble,
          {
            backgroundColor: bubbleColor,
            transform: [{ translateX: tilt }], // Move the bubble based on tilt
          },
    ]}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center"},
    status: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
    text: { position: "absolute", fontSize: 24, fontWeight: "bold"},
    bubble: {
      width: 100,
      height: 100,
      borderRadius: 50,
      position: "fixed",
      opacity: 0.65,
    },
  });

export default AccCamberScreen;