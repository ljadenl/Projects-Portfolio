// AccLevelScreen.js
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated, Dimensions, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Accelerometer } from "expo-sensors";
import * as Haptics from "expo-haptics";

const { width, height } = Dimensions.get("window");
const BUBBLE_LIMIT = 100;
const ORIENTATION_THRESHOLD = 0.2;

const AccLevelScreen = () => {
    const [angle, setAngle] = useState(0);
    const [angleAnim] = useState(new Animated.Value(0));
    const [textOpacity] = useState(new Animated.Value(0));
    const [showLine, setShowLine] = useState(true);
    const [angleTextColor, setAngleTextColor] = useState("black");
    const [isPortrait, setIsPortrait] = useState(height >= width);
    const [prevIsLevel, setPrevIsLevel] = useState(false);

    const Toggle = () => {
      setShowLine(!showLine);
    }

    useFocusEffect(
      React.useCallback(() => {
        const sub = Accelerometer.addListener((data) => {
          const { x, y } = data;

          // detect orientation
          const portrait = height >= width;
          setIsPortrait(portrait);

          let rawAngle = Math.atan2(y, x) * (180 / Math.PI);
          let adjustedAngle = portrait
            ? Math.atan2(x, -y) * (180 / Math.PI)
            : Math.atan2(y, x) * (180 / Math.PI);

          // orientation flip
          if(adjustedAngle > 45) adjustedAngle -= 90;
          if(adjustedAngle > 70) adjustedAngle -= 90;
          else if (adjustedAngle < -70) adjustedAngle += 90;
          

          // clamp angle between -90 and 90
          adjustedAngle = Math.max(-90, Math.min(90, adjustedAngle));
          setAngle(adjustedAngle);
            
          const isLevel = Math.abs(adjustedAngle) < 0.5 || Math.abs(adjustedAngle - 90) < 0.5 || Math.abs(adjustedAngle + 90) < 0.5;
          
          setAngleTextColor(isLevel ? "green" : "black");

          // Haptic feedback when level
          if(isLevel && !prevIsLevel) {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          }
          setPrevIsLevel(isLevel);

          Animated.timing(angleAnim, {
            toValue: adjustedAngle,
            duration: 275,
            useNativeDriver: true,
          }).start();

          // Fade text if close to level
          Animated.timing(textOpacity, {
            toValue: isLevel ? 1 : 0.25,
            duration: 275,
            useNativeDriver: true,
          }).start();

        });

        Accelerometer.setUpdateInterval(100); // Update every 100ms

        return () => {
          sub && sub.remove();
        };
    }, [prevIsLevel])
  );

    // Horizon Line Rotation (clamped between -90 and 90)
const clampedAngle = Math.max(-90, Math.min(90, angle));

Animated.timing(angleAnim, {
  toValue: clampedAngle,
  duration: 275,
  useNativeDriver: true,
}).start();

const rotateHorizon = angleAnim.interpolate({
  inputRange: [-90, 90],
  outputRange: ["-90deg", "90deg"],
  extrapolate: "clamp",
});

/*
        // Horizon Line Rotation
        const rotateHorizon = angleAnim.interpolate({
          inputRange: [-180, 180],
          outputRange: ["-90deg", "90deg"],
        });
*/
    return (
    <View style={styles.container}>
            {/* Edge lines */}
      <View style={styles.topLine} />
      <View style={styles.bottomLine} />
      <View style={styles.leftLine} />
      <View style={styles.rightLine} />

      {/* Line or Angle Representation based on Toggle */}
      {showLine ? (
      <Animated.View
        style={[
          styles.horizonLine,
          { transform: [{ rotate: rotateHorizon }] },
        ]}
      />
      
      ) : (
      <Animated.Text
        style={[
          styles.angleText,
          { color: angleTextColor },
        ]}
      >
        {angle.toFixed(0)}°
      </Animated.Text>
      )}

      {/* Angle Text */}
      {showLine ? (
        <Animated.Text
          style={[styles.angleText,
            { opacity: textOpacity, color: angleTextColor },
          ]}
          >
            {angle.toFixed(0)}°
          </Animated.Text>
      ) : (
        <Text style={[styles.angleText, { color: angleTextColor }]}>
          {angle.toFixed(0)}°
        </Text>
      )}

      {/* Toggle Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={Toggle} style={styles.button}>
          <Text style={styles.button}>
            {showLine ? "Show Angle" : "Show Line"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
    container: { backgroundColor: "#d9d9d9",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      fontSize: 28, 
      fontWeight: "bold", 
    },

    angleText: {
      fontSize: 24,
      fontWeight: "bold",
      position: "absolute",
      marginBottom: 20,
    },

    buttonContainer: {
      width: "100%",
      position: "absolute",
      bottom: 0,
      alignItems: "left",
    },

    button: {
      fontSize: 20,
      fontWeight: "bold",
    },


    horizonLine: {
      position: "absolute",
      width: "300%",
      height: 3,
      backgroundColor: "#333",
    },

    // EDGE LINES
    topLine: {
      position: "absolute",
      top: 0,
      left: "50%",
      width: 2,
      height: 30,
      backgroundColor: "#333",
      transform: [{ translateX: -1 }],
    },
    bottomLine: {
      position: "absolute",
      bottom: 0,
      left: "50%",
      width: 2,
      height: 30,
      backgroundColor: "#333",
      transform: [{ translateX: -1 }],
    },
    leftLine: {
      position: "absolute",
      left: 0,
      top: "50%",
      width: 30,
      height: 2,
      backgroundColor: "#333",
      transform: [{ translateY: -1 }],
    },
    rightLine: {
      position: "absolute",
      right: 0,
      top: "50%",
      width: 30,
      height: 2,
      backgroundColor: "#333",
      transform: [{ translateY: -1 }],
    },
  });

export default AccLevelScreen;