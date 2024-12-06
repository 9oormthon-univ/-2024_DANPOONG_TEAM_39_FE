import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';
import { WebView } from 'react-native-webview'; // WebView로 Lottie 렌더링
import { SafeAreaView } from 'react-native-safe-area-context';
import KakaologinButton from '../components/atoms/KakaologinButton';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';

const { width: screenWidth } = Dimensions.get('window');

// Onboarding 데이터
const slides = [
  {
    text: '어르신의 돌봄 일정을 입력하고\n발생하는 돌봄 공백을 확인해요',
    animation: 'https://lottie.host/embed/d260311b-706c-40a6-94c3-eafe27c4a1c6/ESB5llMDY9.lottie',
  },
  {
    text: '돌봄 공백과 일정을 파악하고\n효율적인 돌봄 방법을 추천해요',
    animation: 'https://lottie.host/embed/47d60dc3-6664-4a11-920c-7928d7092ec1/rqZKHtpUTx.lottie',
  },
  {
    text: '돌봄 청년의 정보를 기반으로\n맞춤형 복지 서비스를 연계해요',
    animation: 'https://lottie.host/embed/e466eb8f-20e2-4611-a87d-cd8c0acc872a/NDRdiGO4Pr.lottie',
  },
  {
    text: '손쉬운 돌봄 길라잡이,\n손길과 함께해요!',
    animation: 'https://lottie.host/embed/cb0c9304-829d-429b-8c4d-ab48d1051801/XvZ8ChKADr.lottie',
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const Indicator = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const width = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [8, 24, 8],
            extrapolate: 'clamp',
          });

          const backgroundColor = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [colors.gray200, colors.primary001, colors.gray200],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width, backgroundColor }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <FlatList
          data={slides}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(
              e.nativeEvent.contentOffset.x / screenWidth
            );
            setCurrentIndex(newIndex);
          }}
          renderItem={({ item }) => (
            <View style={styles.slide}>
              {/* 이미지 */}
              <WebView
                source={{ uri: item.animation }}
                style={styles.webview}
                javaScriptEnabled
                domStorageEnabled
                scalesPageToFit
                originWhitelist={['*']}
              />
              {/* 텍스트 */}
              <Text style={styles.text}>{item.text}</Text>
            </View>
          )}
        />
        {/* 페이지네이션 */}
        <Indicator />
      </View>

      {/* 로그인 버튼 */}
      <View style={styles.loginButtonContainer}>
        <KakaologinButton text="카카오 로그인" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
  },
  text: {
    fontSize: 20,
    fontFamily: textStyles.title18SemiBold.fontFamily,
    color: colors.gray900,
    textAlign: 'center',
    position: 'absolute',
    top: '25%', // WebView 상단으로부터 20dp 떨어진 위치
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '30%', // WebView 하단으로부터 20dp 떨어진 위치
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  loginButtonContainer: {
    position: 'absolute',
    bottom: '-3%',
    left: 0,
    right: 0,
  },
});

export default OnboardingScreen;
