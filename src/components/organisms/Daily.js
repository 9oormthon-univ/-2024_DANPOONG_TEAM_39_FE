import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Daily = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>일별 일정 테스트</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // 부모 컨테이너 안에서 공간을 차지하도록 설정
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000', // 빨간색 배경
  },
  text: {
    fontSize: 20,
    color: '#FFFFFF', // 흰색 텍스트
  },
});

export default Daily;
