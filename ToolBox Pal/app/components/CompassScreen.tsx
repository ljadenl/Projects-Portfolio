import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import * as Location from "expo-location";
import type { LocationObjectCoords } from "expo-location";

const CompassScreen = () => {
  const [heading, setHeading] = useState(0);
  const rotateAnim = useState(new Animated.Value(0))[0];
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [add1, setAdd1] = useState<LocationObjectCoords | null>(null);
  const [add2, setAdd2] = useState<LocationObjectCoords | null>(null);

  
useEffect(() => {
  const startCompass = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    // Get location
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation.coords);

    // Get Address
    const geo = await Location.reverseGeocodeAsync(currentLocation.coords);
    if(geo.length > 0) {
      setAdd1(`${geo[0].city}, ${geo[0].region}`);
      setAdd2(`${geo[0].street}`);
      
    }

    // Start heading updates
    Location.watchHeadingAsync((headingData) => {
      const trueHeading = headingData.trueHeading ?? headingData.magHeading;
      setHeading(trueHeading);

      Animated.timing(rotateAnim, {
        toValue: trueHeading,
        duration: 200,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    });
  };

  startCompass();
}, []);

  const interpolatedRotate = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {add1 && <Text style={styles.locationText}>{add1}</Text>}
      {add2 && <Text style={styles.locationText}>{add2}</Text>}

      { /* <Text style={styles.headingText}>{Math.round(heading)}°</Text> */ }

      {/* Compass circle */}
      <Animated.View style={[styles.compass, { transform: [{ rotate: `${360 - heading}deg` }] }]}>
        {/* Cardinal points */}
        <Text style={[styles.direction, styles.north]}>N</Text>
        <Text style={[styles.direction, styles.east]}>E</Text>
        <Text style={[styles.direction, styles.south]}>S</Text>
        <Text style={[styles.direction, styles.west]}>W</Text>
      </Animated.View>

      {/* 🔻 Location info here */}
    {location && (
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>
          Latitude: {location.latitude.toFixed(5)}
        </Text>
        <Text style={styles.locationText}>
          Longitude: {location.longitude.toFixed(5)}
        </Text>
      </View>
    )}

    </View>
  );

};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#d9d9d9",
      alignItems: "center",
      justifyContent: "center",
    },
  
    headingText: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 30,
    },
  
    compass: {
      width: 250,
      height: 250,
      borderRadius: 125,
      borderWidth: 3,
      borderColor: "#333",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
  
    direction: {
      position: "absolute",
      fontSize: 24,
      fontWeight: "bold",
    },
  
    north: { top: 10, left: "45%", color: "red" },
    south: { bottom: 10, left: "45%" },
    east: { right: 10, top: "45%" },
    west: { left: 10, top: "45%" },

    locationBox: {
      marginTop: 30,
      alignItems: "center",
    },

    locationText: {
      fontSize: 20,
      color: "#333",
      fontWeight: "bold",
      marginBottom: 15,
    },

});
  
export default CompassScreen