import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Daily = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>오늘의 일정 테스트</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Daily;
