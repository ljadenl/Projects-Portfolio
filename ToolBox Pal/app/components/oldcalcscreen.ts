import React, { use, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity} from 'react-native';


const categories = [
  { id: '1', title: 'Area', screen: 'AreaCalc' },
  { id: '2', title: 'Volume', screen: 'VolumeCalac' },
  { id: '3', title: 'Unit Conversion', screen: 'ConversionCalc' }
];

export default function CalculatorScreen({ navigation}) {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [height, setHeight] = useState('');
    const [area, setArea] = useState(null);
    const [volume, setVolume] = useState(null);



    const calcArea = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);
        if(!isNaN(l) && !isNaN(w)) {
            setArea(l * w);
        }
    };

    const calcVolume = () => {
        const l = parseFloat(length);
        const w = parseFloat(width);    
        const h = parseFloat(height);
        if (!isNaN(l) && !isNaN(w) && !isNaN(h)) {
            setVolume(l * w * h);
        }
    };

    return (
        <View style={styles.container}>
          {/*<Text style={styles.title}>Area & Volume Calculator</Text>*/}
    
          <TextInput
            style={styles.input}
            placeholder="Length"
            placeholderTextColor={'#222'}
            keyboardType="numeric"
            value={length}
            onChangeText={setLength}
          />
          <TextInput
            style={styles.input}
            placeholder="Width"
            placeholderTextColor={'#222'}
            keyboardType="numeric"
            value={width}
            onChangeText={setWidth}
          />
          <TextInput
            style={styles.input}
            placeholder="Height (for volume)"
            placeholderTextColor={'#00aa00'}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
          />
    
          <Button title="Calculate Area" onPress={calcArea} />
          <Text style={styles.result}>{area !== null && `Area: ${area}`}</Text>
    
          <Button title="Calculate Volume" onPress={calcVolume} />
          <Text style={styles.result}>{volume !== null && `Volume: ${volume}`}</Text>
        </View>
    );

}
const styles = StyleSheet.create({
    container: {
      padding: 20,
      alignItems: 'stretch',
      marginTop: 50,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderColor: '#222',
        borderWidth: 1,
        marginBottom: 12,
        padding: 10,
        borderRadius: 8,   
    },
    result: {
        fontSize: 18,
        marginVertical: 10,
        textAlign: 'center',
    }
});