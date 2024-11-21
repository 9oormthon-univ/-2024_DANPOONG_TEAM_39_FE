import React from 'react';
import {Text, StyleSheet, ScrollView } from 'react-native';

const Daily = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      nestedScrollEnabled={true} // 부모 ScrollView와 충돌 방지
    >
      <Text style={styles.text}>오늘의 일정 테스트</Text>
      {/* 추가 내용 */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red', // 배경색 확인용
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Daily;
