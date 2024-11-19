import React from "react";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>일정을 쉽게 관리할 수 있어요</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace("HomeScreen")} // HomeScreen으로 이동
      >
        <Text style={styles.buttonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 수평 중앙 정렬
    backgroundColor: "#fdfcfc", // 배경색
    paddingHorizontal: 20, // 좌우 여백
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#343332",
    textAlign: "center",
    fontFamily: "Pretendard",
    marginBottom: 40, // 텍스트와 버튼 사이의 간격
  },
  button: {
    backgroundColor: "#FF7F00", // 버튼 배경색
    paddingVertical: 15, // 버튼의 상하 여백
    paddingHorizontal: 40, // 버튼의 좌우 여백
    borderRadius: 8, // 둥근 버튼
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF", // 버튼 텍스트 색상
    fontSize: 16,
    fontWeight: "700",
  },
});

export default OnboardingScreen;
