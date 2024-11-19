import React from "react";
import { View, StyleSheet } from "react-native";
import KakaoButton from "../components/atoms/AbledButton";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <KakaoButton onPress={() => navigation.replace("HomeScreen")} text="시작하기"/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // 배경색
  },
});

export default OnboardingScreen;
