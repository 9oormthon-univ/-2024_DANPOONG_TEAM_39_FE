import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CalendarButton = () => {
  const [buttonText, setButtonText] = useState('주'); // 초기 텍스트는 '주'

  const handlePress = () => {
    setButtonText((prevText) => (prevText === '주' ? '일' : '주'));
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45, // 버튼 너비
    height: 32, // 버튼 높이
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
    backgroundColor: '#F3F3F2', // 버튼 배경색
    borderRadius: 50, // 버튼 모서리 둥글게 설정
  },
  text: {
    fontSize: 14, // 텍스트 크기
    fontWeight: '600', // SemiBold 스타일
    lineHeight: 24, // 피그마에서 지정된 Line Height
    color: '#000', // 텍스트 색상
    fontFamily: 'Pretendard-SemiBold', // Pretendard SemiBold 사용
  },
});

export default CalendarButton;
