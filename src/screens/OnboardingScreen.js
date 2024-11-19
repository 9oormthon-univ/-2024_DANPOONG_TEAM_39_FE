import React from "react";
import { View, StyleSheet } from "react-native";
import AbledButton from "../components/atoms/AbledButton";

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AbledButton onPress={() => navigation.replace("LoginScreen")} text="시작하기"/>
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
