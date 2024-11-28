import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import fonts from '../../styles/fonts';

const CalendarButton = ({ onChangeView = () => {} }) => {
  const [buttonText, setButtonText] = useState('주'); // 초기 텍스트는 '주'

  const handlePress = () => {
    const newText = buttonText === '주' ? '일' : '주';
    setButtonText(newText);
    //console.log('Button Pressed:', newText); // 상태 변경 확인
    onChangeView(newText); // 버튼 상태 변경 시 호출
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={styles.text}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3F2',
    borderRadius: 50,
  },
  text: {
    fontSize: 14, // 텍스트 크기
    fontFamily: fonts.semiBold, // SemiBold 스타일
    lineHeight: 24, // 피그마에서 지정된 Line Height
    color: '#000', // 텍스트 색상
  },
});

export default CalendarButton;
