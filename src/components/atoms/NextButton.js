import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const KakaoButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      {/* 버튼 중앙에 텍스트 */}
      <Text style={styles.text}>카카오 로그인</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 52, // 화면 하단에서 30dp 떨어짐
    width: "90%", // 화면 너비의 80% 차지
    height: 62,
    backgroundColor: "#FEE500", // Kakao yellow
    borderRadius: 16,
    justifyContent: "center", // 중앙 정렬
    alignItems: "center", // 중앙 정렬
    alignSelf: "center", // 부모 기준으로 수평 중앙 배치
  },
  text: {
    color: "#000", // 텍스트 색상 (검정)
    fontSize: 18, // 텍스트 크기
    fontWeight: "bold", // 굵은 텍스트
  },
});

export default KakaoButton;
