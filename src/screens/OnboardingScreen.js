import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Animated, Image } from 'react-native';
import { WebView } from 'react-native-webview'; // WebView 추가
import { SafeAreaView } from 'react-native-safe-area-context'; // SafeAreaView 추가
import KakaologinButton from '../components/atoms/KakaologinButton';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import 'react-native-url-polyfill/auto'; // URLSearchParams 폴리필 추가
import { KAKAO_CLIENT_ID, KAKAO_REDIRECT_URI } from '@env';

const CLIENT_ID = KAKAO_CLIENT_ID;
const REDIRECT_URI = KAKAO_REDIRECT_URI;
const { width: screenWidth } = Dimensions.get('window');

// Onboarding 데이터
const slides = [
  {
    text: '어르신의 돌봄 일정을 입력하고\n발생하는 돌봄 공백을 확인해요',
    image: require('../assets/images/Onboarding_image1.png'),
  },
  {
    text: '돌봄 공백과 일정을 파악하고\n효율적인 돌봄 방법을 추천해요',
    image: require('../assets/images/Onboarding_image2.png'),
  },
  {
    text: '돌봄 청년의 정보를 기반으로\n맞춤형 복지 서비스를 연계해요',
    image: require('../assets/images/Onboarding_image3.png'),
  },
  {
    text: '손쉬운 돌봄 길라잡이,\n손길과 함께해요!',
    image: require('../assets/images/Onboarding_image4.png'),
  },
];

const OnboardingScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWebView, setShowWebView] = useState(false); // WebView 표시 상태 관리
  const scrollX = useRef(new Animated.Value(0)).current;

  // 카카오 로그인 URL 생성
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  // WebView에서 네비게이션 상태 변화 처리
  const handleNavigationStateChange = (navState) => {
    if (navState.url.startsWith(REDIRECT_URI)) {
      // Redirect URI 처리 (카카오 서버가 리다이렉트한 URL)
      const params = new URL(navState.url).searchParams;
      const code = params.get('code'); // Authorization Code 추출

      if (code) {
        setShowWebView(false); // WebView 닫기

        // 홈 화면으로 이동하며 Authorization Code 전달
        navigation.replace('AddCareFamily', { code });
      }
    }
  };

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
      {showWebView ? (
        <WebView
          source={{ uri: KAKAO_AUTH_URL }} // 카카오 로그인 페이지 URL
          onNavigationStateChange={handleNavigationStateChange}
          style={{ flex: 1 }}
        />
      ) : (
        <>
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
              renderItem={({ item, index }) => (
                <View style={styles.slide}>
                  <Text
                    style={[
                      styles.text,
                      index === 3 && styles.textLeft,
                    ]}
                  >
                    {item.text}
                  </Text>
                  <Image source={item.image} style={styles.image} />
                </View>
              )}
            />
            <Indicator />
          </View>

          {/* 로그인 버튼 */}
          <View style={styles.loginButtonContainer}>
            <KakaologinButton
              onPress={() => setShowWebView(true)} // WebView 표시
              text="카카오 로그인"
            />
          </View>
        </>
      )}
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
  text: {
    fontSize: 20,
    fontFamily: textStyles.title18SemiBold.fontFamily,
    color: colors.gray900,
    marginBottom: 10,
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
    fontFamily: textStyles.title18SemiBold.fontFamily,
    width: screenWidth * 0.8,
  },
  image: {
    width: screenWidth * 0.8,
    height: screenWidth * 0.8,
    resizeMode: 'contain',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 200,
    width: '100%',
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