import React, { useState, useRef } from 'react';
import { View, Animated, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/templates/Header';
import FamilyList from '../components/organisms/FamilyList';
import CalendarDatepicker from '../components/molecules/CalendarDatepicker';
import WeekDays from '../components/organisms/WeekDays';
import TimeLine from '../components/atoms/TimeLine';
import TimeBlockList from '../components/organisms/TimeBlockList';
import MockTasks from '../datas/MockTasks';
import moment from 'moment';
import 'moment/locale/ko';
import colors from '../styles/colors';

moment.locale('ko'); // 애플리케이션 전역에서 한글로 설정

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // 주 상태 관리
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week')); // 현재 주의 시작일

  // FamilyList 컴포넌트의 높이와 투명도 애니메이션 설정
  const familyListHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [100, 0],
    extrapolate: 'clamp',
  });

  const familyListOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // 프로필 목록 (예시)
  const profiles = [
    { name: '김수한무거', imagePath: require('../assets/images/profile_me.png') },
    { name: '박수한무거', imagePath: require('../assets/images/profile.png') },
    { name: '이수한무거북', imagePath: require('../assets/images/profile.png') },
    { name: '정수한무거북', imagePath: require('../assets/images/profile.png') },
    { name: '류수한무거', imagePath: require('../assets/images/profile.png') },
    { name: '최수한무거', imagePath: require('../assets/images/profile.png') },
    { name: '남수한무거', imagePath: require('../assets/images/profile.png') },
  ];

  // 타임라인 시간 배열
  const hours = Array.from({ length: 24 }, (_, index) => index); // 0 ~ 23 생성

  return (
    <View style={styles.container}>
      <Header />

      {/* 애니메이션이 적용된 FamilyList 컴포넌트 */}
      <Animated.View
        style={[
          styles.familyListContainer,
          { height: familyListHeight, opacity: familyListOpacity },
        ]}
      >
        <FamilyList profiles={profiles} />
      </Animated.View>

      {/* CalendarDatepicker 고정
      <View style={styles.datePickerContainer}>
        <CalendarDatepicker currentWeek={currentWeek} setCurrentWeek={setCurrentWeek} />
        <WeekDays currentWeek={currentWeek} />
      </View>*/}

      {/* 타임블록 반복 렌더링 */}
      <ScrollView
        style={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <View style={styles.content}>
          {hours.map((hour) => (
            <TimeLine key={hour} hour={hour} />
          ))}

          {/* 일정 블록 렌더링 */}
          <TimeBlockList tasks={MockTasks} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: '#FF7F00',
  },
  familyListContainer: {
    width: '100%', // FamilyList가 가로로 화면을 다 채우도록 설정
    backgroundColor: '#FF7F00',
    paddingHorizontal: 0, // 패딩을 없애서 여백 제거
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20, // 왼쪽 상단 둥근 모서리
    borderTopRightRadius: 20, // 오른쪽 상단 둥근 모서리
    zIndex: 10,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.gray050,
    overflow: 'hidden', // 둥근 모서리가 유지되도록 overflow 설정
  },
  content: {
    paddingLeft: 10,
  },
});

export default HomeScreen;
