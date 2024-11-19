import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import SvgIcon from "../../assets/images/kakao_icon.svg"; // SVG 컴포넌트로 불러오기
import textStyles from "../../styles/textStyles"; // 텍스트 스타일 불러오기

const KakaoButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        {/* 왼쪽에 SVG 아이콘 */}
        <SvgIcon width={24} height={24} style={styles.icon} />
        {/* 오른쪽에 텍스트 */}
        <Text style={[styles.text, textStyles.title18Bold]}>
          카카오 로그인
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 52, // 화면 하단에서 52dp 떨어짐
    width: "90%", // 화면 너비의 90% 차지
    height: 62,
    backgroundColor: "#FEE500", // Kakao yellow
    borderRadius: 16,
    justifyContent: "center", // 버튼 안에서 수직 중앙 정렬
    alignItems: "center", // 버튼 안에서 수평 중앙 정렬
    alignSelf: "center", // 부모 기준으로 수평 중앙 배치
  },
  content: {
    flexDirection: "row", // 가로 배치
    alignItems: "center", // 이미지와 텍스트 수직 중앙 정렬
  },
  icon: {
    marginRight: 8, // 텍스트와의 간격
  },
  text: {
    color: "#000", // 텍스트 색상 (검정)
  },
});

export default KakaoButton;
