import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Keyboard, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import { formulas } from './formulas'

export default function FormulaCalculator() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={10}
      >
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {Array.isArray(formulas) ? (
        formulas.map((item) => (
          <FormulaCard key={item.id} formula={item} />
        ))
      ) : (
        <Text> Formulas not loaded</Text>
      )}
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FormulaCard({ formula }) {
  const [inputs, setInputs] = useState({});
  const [reversed, setReversed] = useState(false);

  const currentFields = reversed ? formula.fields2 || formula.fields : formula.fields;
  const currentPlaceholders = formula.placeholders
  ? (reversed ? formula.placeholders.p2 : formula.placeholders.p1)
  : {};


  const allFieldsFilled = currentFields.every((field) => typeof inputs[field] === 'number' && !isNaN(inputs[field]));

  let result = null;
  if(allFieldsFilled) {
    try {
      result = reversed
      ? formula.calculateReversed?.(inputs) ?? formula.calculate(inputs)
      : formula.calculate(inputs);
      //result = formula.calculate(inputs);
    }catch (error){
      result = "Error";
    }
  }

  const Toggle = () => {
    setReversed(!reversed);
    setInputs({});
  };


  /*
  const calculate = () => {
    const allFieldsFilled = formula.fields.every((field) => !isNaN(inputs[field]));
    if(allFieldsFilled) {
      const output = formula.calculate(inputs);
      setResult(output);
    }else{
      setResult('Missing or invalid input');
    }
  }
    */

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{reversed ? formula.title2 : formula.title}</Text>
      <Text style={styles.formula}>{reversed ? formula.form2 : formula.formula}</Text>
      {currentFields.map((field) => (
        <TextInput
          key={field}
          placeholder={currentPlaceholders[field] || field}
          placeholderTextColor={"#000"}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
          style={styles.input}
          value={inputs[field]?.toString() || ''}
          onChangeText={(value) => {
            const num = parseFloat(value);
            setInputs((prev) => ({ ...prev, [field]: isNaN(num) ? undefined : num }));
          }}
        />
      ))}

      {formula.isConvertible && (
        <TouchableOpacity onPress={Toggle} style={{ marginVertical: 6 }}>
          <Text style={{ color: "#007aff" }}> {formula.convertbtn} </Text>
        </TouchableOpacity>
      )}

      {result !== null && (
        <Text style={styles.result}>
          Result: {typeof result === 'number' ? result.toFixed(2) : result}
        </Text>
      )}
    </View>
  );
  /*
  return (
    <View style={{ padding: 10, borderBottomWidth: 1 }}>
      <Text style={{ fontSize: 18 }}>{formula.title}</Text>
      <Text>{formula.formula}</Text>
      {formula.fields.map((field) => (
        <TextInput
          key={field}
          placeholder={field}
          keyboardType="numeric"
          style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
          onChangeText={(value) =>
            setInputs({ ...inputs, [field]: parseFloat(value) || 0 })
          }
        />
      ))}
      {result !== null && (
        <Text style={{ fontWeight: 'bold' }}>Result: {result.toFixed(2)}</Text>
      )}
    </View>
  );*/
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    backgroundColor: "#d9d9d9",
    paddingTop: 40,
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  formula: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    width: '60%',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  result: {
    fontSize: 16,
    marginTop: 8,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    color: 'red',
  },
});

