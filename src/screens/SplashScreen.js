// src/screens/SplashScreen.js
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import textStyles from '../styles/textStyles';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('OnboardingScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.image} />
      <Text style={textStyles.title18Bold}>손길 : 손 쉬운 돌봄 길라잡이</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  image: {
    width: 96,
    height: 96,
    marginBottom: 20,
    marginLeft: 132,
    marginRight: 132,
    alignSelf: 'center',
  },
});
