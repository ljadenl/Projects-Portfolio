import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import socketSizes from './socket_sizes.json';
import { convertMetricToImperial, convertImperialToMetric } from './UnitConversion';

const SocketSizeScreen = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSockets, setFilteredSockets] = useState(socketSizes);
    const [ApproximateSize, setApproximateSize] = useState(null);

    const onSearch = (query) => {
      setSearchQuery(query);

      let formattedQuery = query;

      if(!isNaN(query) && query.length === 1) {
        formattedQuery = `0${query}`;
      }
      
      if (query) {
          // Filter exact matches
          const filteredData = socketSizes.filter(socket => 
              socket.metric.includes(formattedQuery) || socket.imperial.includes(query)
          );
  
          setFilteredSockets(filteredData);
  
          if (filteredData.length === 0) {
              // No exact match, try approximate conversion
              let numericQuery = parseFloat(query);
              let approxMetric = null;
              let approxImperial = null;
  
              if (!isNaN(numericQuery)) {
                  if (numericQuery > 3) {
                      // Assume input is in mm (metric) since socket sizes in inches are usually <3 inches
                      const imperialResult = convertMetricToImperial(numericQuery);
                      approxImperial = imperialResult.inches.toFixed(3);
                      approxMetric = numericQuery; // Keep original
                      setApproximateSize({ metric: approxMetric, imperial: approxImperial, fraction: imperialResult.fraction });
                  } else {
                      // Assume input is in inches (imperial)
                      approxMetric = convertImperialToMetric(numericQuery).toFixed(2);
                      approxImperial = numericQuery; // Keep original
                      setApproximateSize({ metric: approxMetric, imperial: approxImperial });
                  }
                  
                  setApproximateSize({ metric: approxMetric, imperial: approxImperial });
              } else {
                  setApproximateSize(null);
              }
          } else {
              setApproximateSize(null);
          }
      } else {
          setFilteredSockets(socketSizes);
          setApproximateSize(null);
      }
  };
    
/*    const onSearch = query => {
      setSearchQuery(query);
      let filteredData = [];

      if (query) {
          // Check if input is metric or imperial
          const queryNumber = parseFloat(query);
          const isMetric = query.includes("mm") || queryNumber > 5; // Rough assumption: Metric sizes > 5mm

          filteredData = socketSizes.filter(socket => 
              socket.metric.toString().includes(query) || socket.imperial.toString().includes(query)
          );

          if (filteredData.length === 0 && !isNaN(queryNumber)) {
              // Find closest match if exact size not found
              const closest = isMetric 
                  ? convertMetricToImperial(queryNumber) 
                  : convertImperialToMetric(queryNumber);
              setApproximateMatch(closest);
          } else {
              setApproximateMatch(null);
          }
      } else {
          filteredData = socketSizes;
          setApproximateMatch(null);
      }

      setFilteredSockets(filteredData);
  };*/
/*
    const onSearch = query => {
        setSearchQuery(query);

        if(query) {
            const filteredData = socketSizes.filter(socket => 
                socket.metric.includes(query) || socket.imperial.includes(query)
            );
            setFilteredSockets(filteredData);
        }else{
            setFilteredSockets(socketSizes);
        }
    };
*/
return (
<View style={styles.container}>
      <Searchbar
        placeholder='Enter Socket Size'
        onChangeText={onSearch}
        value={searchQuery}
        style={styles.searchbar}
        inputStyle={styles.searchbarInput}
        placeholderTextColor="#888"
        
      />
      <FlatList
        data={filteredSockets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.socketItem}>
            <Text style={styles.socketText}>Metric: {item.metric}</Text>
            <Text style={styles.socketText}>Imperial: {item.imperial}</Text>
           {/*optional output for torque specs} <Text>Torque (Nm): {item.torque_nm}</Text>
            <Text>Torque (ft-lb): {item.torque_ftlb}</Text> */}
          </View>
        )}
      />
      {ApproximateSize && (
        <View style={styles.approxContainer}>
            <Text style={styles.approxText}>Approximate Sizes:</Text>
            <Text style={styles.socketText}>Metric: {ApproximateSize.metric} mm</Text>
            <Text style={styles.socketText}>Imperial: {ApproximateSize.imperial} in</Text>
            <Text style={styles.approxText}>Fraction: {ApproximateSize.fraction}</Text>

                </View>
            )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 100,
    flex: 1,
    backgroundColor: '#fff',
  },
  searchbar: {
    marginTop: 50,
    width: 200,
    backgroundColor: '#f0f0f0',
  },
  searchbarInput: {
    fontSize: 16,
    color: '#333',
  },
  socketItem: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f4f4f4',
    borderRadius: 5,
  },
  socketText: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  approxContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
},
approxText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#555',
},
});

export default SocketSizeScreen;