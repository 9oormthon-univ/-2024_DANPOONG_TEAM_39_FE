import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import KakaoButton from "../components/atoms/KakaologinButton";
import colors from "../styles/colors"; // colors.js에서 색상 불러오기

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* 상단 텍스트 */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>손쉬운 돌봄 길라잡이,</Text>
        <Text style={styles.subtitle}>손길과 함께해요!!</Text>
      </View>
      {/* 중앙에 이미지 */}
      <Image
        source={require("../assets/images/img_onboarding.png")}
        style={styles.image}
        resizeMode="contain" // 이미지 원본 비율 유지
      />
      {/* 하단 버튼 */}
      <KakaoButton
        onPress={() => navigation.replace("HomeScreen")}
        text="시작하기"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white000, // 배경색을 colors.js에서 불러오기
    justifyContent: "center", // 수직 중앙 정렬
    alignItems: "center", // 수평 중앙 정렬
    paddingHorizontal: 0, // 좌우 여백
  },
  textContainer: {
    marginBottom: 20, // 이미지와 상단 텍스트 사이 간격
    alignSelf: "flex-start", // 부모 컨테이너 기준 왼쪽 정렬
    paddingHorizontal: 20, // 텍스트 왼쪽 여백
  },
  title: {
    fontSize: 24, // 첫 줄 글씨 크기
    color: colors.gray900, // Gray900 색상 사용
    fontWeight: "bold", // 굵은 텍스트
    marginBottom: 4, // 두 줄 텍스트 사이 간격
    textAlign: "left", // 왼쪽 정렬
  },
  subtitle: {
    fontSize: 24, // 두째 줄 글씨 크기
    color: colors.primary001, // Primary001 색상 사용
    fontWeight: "bold", // 굵은 텍스트
    textAlign: "left", // 왼쪽 정렬
  },
  image: {
    width: "90%", // 화면 너비의 90% 차지
    aspectRatio: 1, // 가로:세로 비율 유지
    marginBottom: 30, // 이미지와 버튼 사이 간격
  },
});

export default LoginScreen;
