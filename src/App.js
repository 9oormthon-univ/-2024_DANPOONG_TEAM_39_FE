import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
function App() {
  const [message, setMessage] = useState("Hello, World!");
  const changeMessage = () => {
    setMessage("You clicked the button!");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
      <Button title="Click Me" onPress={changeMessage} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
});
export default App;