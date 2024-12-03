import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'; // iOS 세이프 에리어
import TaskAbledButton from '../components/atoms/TaskAbledButton';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import CareFamilyChevronIcon from '../assets/images/carefamily_chevron.svg';

const AddCareFamily = () => {
  const navigation = useNavigation();

  // "이미 가족이 있어요" 클릭 핸들러
  const handleAlreadyHaveFamily = () => {
    navigation.navigate('EnterCaregiverModal'); // EnterCaregiverModal로 이동
  };

  // "돌봄 가족 추가" 클릭 핸들러
  const handleAddFamily = () => {
    navigation.navigate('HomeScreen'); // HomeScreen으로 이동
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerText}>돌봄 가족 추가</Text>
      </View>

      {/* 프로그레스 바 */}
      <View style={styles.progressBar}>
        <View style={styles.progress} />
      </View>

      {/* 콘텐츠 */}
      <View style={styles.textContent}>
        <Text style={styles.mainText}>
          가족이 관리해야 하는 {"\n"}<Text style={styles.highlightText}>돌봄 가족의 정보를 입력해요.</Text>
        </Text>
        <Text style={styles.subText}>
          손길로 관리할 돌봄 일정의 대상이 되는{"\n"}돌봄 가족의 정보를 입력해주세요.
        </Text>
      </View>

      {/* 하단 버튼 및 링크 */}
      <View style={styles.bottomSection}>
        {/* "이미 가족이 있어요" */}
        <TouchableOpacity style={styles.linkContainer} onPress={handleAlreadyHaveFamily}>
          <Text style={styles.linkText}>이미 가족이 있어요</Text>
          <CareFamilyChevronIcon style={styles.arrow} />
        </TouchableOpacity>

        {/* 하단 버튼 */}
        <View style={styles.buttonContainer}>
          <TaskAbledButton text="돌봄 가족 추가" onPress={handleAddFamily} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white000,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 10, // iOS와 Android의 상단 여백 조정
  },
  header: {
    height: 41,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerText: {
    ...textStyles.title18SemiBold,
    color: colors.gray900,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.gray200,
    borderRadius: 2,
    marginVertical: 16,
  },
  progress: {
    width: '70%', // 현재 진행률
    height: '100%',
    backgroundColor: colors.primary001,
  },
  textContent: {
    flex: 1, // 상단 콘텐츠가 하단 영역을 밀지 않도록
    justifyContent: 'flex-start',
    alignSelf: 'flex-start', // 왼쪽 정렬
    paddingHorizontal: 11,
  },
  mainText: {
    ...textStyles.title18Bold,
    color: colors.gray900,
    textAlign: 'left',
    marginBottom: 8,
    lineHeight: 36,
  },
  highlightText: {
    color: colors.primary001,
  },
  subText: {
    color: colors.gray800,
    ...textStyles.subtitle14SemiBold24,
    textAlign: 'left',
    marginTop: 8,
    lineHeight: 24,
  },
  bottomSection: {
    justifyContent: 'flex-end',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  linkText: {
    ...textStyles.title14Bold,
    color: colors.primary001,
  },
  arrow: {
    color: colors.primary001,
  },
});

export default AddCareFamily;
