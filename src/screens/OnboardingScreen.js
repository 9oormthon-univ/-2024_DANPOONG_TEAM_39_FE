import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import KakaologinButton from '../components/atoms/KakaologinButton';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';

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
  const scrollX = useRef(new Animated.Value(0)).current;

  // 인디케이터 컴포넌트
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
    <View style={styles.container}>
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
              {/* 텍스트 */}
              <Text
                style={[
                  styles.text,
                  index === 3 && styles.textLeft, // 4번째 페이지는 왼쪽 정렬
                ]}
              >
                {item.text}
              </Text>
              {/* 이미지 */}
              <Image source={item.image} style={styles.image} />
            </View>
          )}
        />

        {/* 인디케이터 */}
        <Indicator />
      </View>

      {/* 로그인 버튼 */}
      <View style={styles.loginButtonContainer}>
        <KakaologinButton
          onPress={() => navigation.replace('HomeScreen')}
          text="카카오 로그인"
        />
      </View>

    </View>
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
    fontFamily: textStyles.title18SemiBold.fontFamily, // 올바른 폰트 속성
    color: colors.gray900,
    marginBottom: 10,
    textAlign: 'center', // 기본 중앙 정렬
  },
  textLeft: {
    textAlign: 'left', // 4번째 페이지는 왼쪽 정렬
    fontFamily: textStyles.title18SemiBold.fontFamily, // 올바른 폰트 속성
    width: screenWidth * 0.8, // 너비 조정
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

