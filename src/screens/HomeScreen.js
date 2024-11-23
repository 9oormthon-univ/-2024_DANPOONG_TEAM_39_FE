import React, { useState, useRef } from 'react';
import { View, Animated, ScrollView, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // SafeAreaView 임포트
import Header from '../components/templates/Header';
import FamilyList from '../components/organisms/FamilyList';
import CalendarDatepicker from '../components/molecules/CalendarDatepicker';
import WeekDays from '../components/organisms/WeekDays';
import TimeBlockList from '../components/organisms/TimeBlockList';
import DailySchedule from '../components/organisms/DailySchedule';
import MockTasks from '../datas/MockTasks';
import Profiles from '../datas/Profiles';
import FloatingButton from '../components/atoms/FloatingButton';
import moment from 'moment';
import 'moment/locale/ko';
import colors from '../styles/colors';

moment.locale('ko');

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // 주 상태 관리
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week')); // 현재 주의 시작일
  const weekDates = Array.from({ length: 7 }, (_, i) =>
    currentWeek.clone().add(i, 'days')
  );


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

  // 타임라인 시간 배열
  const hours = Array.from({ length: 24 }, (_, index) => index); // 0 ~ 23 생성

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.primary001 }}>
      <Header />

      <Animated.View
        style={[
          styles.familyListContainer,
          { height: familyListHeight, opacity: familyListOpacity },
        ]}
      >
        <FamilyList Profiles={Profiles} />
      </Animated.View>

      {/* CalendarDatepicker + Weekdays 컴포넌트 */}

      <View style={styles.datePickerContainer}>
        <CalendarDatepicker
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          onChangeView={handleViewChange}
        />
        <WeekDays currentWeek={currentWeek} />
      </View>

      {/* 일정 렌더링 */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        keyboardShouldPersistTaps="handled" // 키보드 관련 스크롤 이슈 해결
        nestedScrollEnabled={true} // 자식 ScrollView가 스크롤 가능하게 함
      >

        {/* 위클리 컴포넌트 렌더링 */}
        <View style={styles.weeklyContent}>
          {/* 타임블록 렌더링 */}
          <View style={styles.timeblockContainer}>
            <TimeBlockList tasks={MockTasks} weekDates={weekDates}/>
          </View>
        </View>
      </ScrollView>

      {/* 플로팅 카테고리 버튼 */}
      <FloatingButton />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray050,
  },
  familyListContainer: {
    width: '100%',
    backgroundColor: '#FF7F00',
    paddingHorizontal: 0,
  },
  datePickerContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 10,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: colors.gray050,
  },
  scrollContent: {
    paddingBottom: 80, // 하단 여유 공간 추가
    zIndex: 1,
  },
  weeklyContent: {
    paddingLeft: 10,
  },
});

export default HomeScreen;
