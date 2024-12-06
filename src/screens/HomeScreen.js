import React, { useState, useRef } from 'react';
import { View, Animated, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/templates/Header';
import SideBar from '../components/templates/SideBar';
import FamilyList from '../components/organisms/FamilyList';
import CalendarDatepicker from '../components/molecules/CalendarDatepicker';
import WeekDays from '../components/organisms/WeekDays';
import TimeBlockList from '../components/organisms/TimeBlockList';
import TimeBlockList2 from '../components/organisms/TimeBlockList2'; // 김구름 전용
import DailySchedule from '../components/organisms/DailySchedule';
import DailySchedule2 from '../components/organisms/DailySchedule2'; // 김구름 전용
import FloatingButton from '../components/atoms/FloatingButton';
import moment from 'moment';
import 'moment/locale/ko';
import colors from '../styles/colors';

moment.locale('ko');

const HomeScreen = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // 주 상태 관리
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week')); // 현재 주의 시작일
  const [viewMode, setViewMode] = useState('week'); // 'week' 또는 'day' 상태 관리
  const [selectedProfile, setSelectedProfile] = useState(null); // 선택된 프로필
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // WeekDays에서 선택된 날짜

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

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: colors.primary001 }}>
      
      {/* 헤더 */}
      <Header onMenuPress={toggleSidebar} />

      {/* 사이드바 (오버레이로 화면 위에 렌더링) */}
      {isSidebarVisible && (   
          <SideBar visible={isSidebarVisible} onClose={toggleSidebar} navigation={navigation} />
      )}

      {/* FamilyList 컴포넌트 */}
      <Animated.View
        style={[
          styles.familyListContainer,
          { height: familyListHeight, opacity: familyListOpacity },
        ]}
      >
        <FamilyList onSelectProfile={setSelectedProfile} />
      </Animated.View>

      {/* CalendarDatepicker + WeekDays 컴포넌트 */}
      <View style={styles.datePickerContainer}>
        <CalendarDatepicker
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          onChangeView={(newView) => setViewMode(newView === '주' ? 'week' : 'day')}
        />
        <WeekDays
          currentWeek={currentWeek}
          onDateSelect={(date) => setSelectedDate(date)} // 선택된 날짜를 업데이트
        />
      </View>

      {/* 일정 렌더링 */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      >
        <View style={styles.content}>
          {/* 선택된 프로필에 따라 다른 컴포넌트 렌더링 */}
          {viewMode === 'week' ? (
            <View style={styles.timeblockContainer}>
              {selectedProfile?.id === 0 ? ( // id가 0일 때
                <TimeBlockList weekDates={weekDates} selectedProfile={selectedProfile} /> // 선택한 프로필 전달
              ) : ( // id가 0이 아닐 때
                <TimeBlockList2 weekDates={weekDates} selectedProfile={selectedProfile} /> // 선택한 프로필 전달
              )}
            </View>
          ) : (
            <View style={styles.dailyContent}>
              {selectedProfile?.id === 0 ? ( // id가 0일 때
                <DailySchedule selectedDate={selectedDate} selectedProfile={selectedProfile} /> // 선택한 프로필 전달
              ) : ( // id가 0이 아닐 때
                <DailySchedule2 selectedDate={selectedDate} selectedProfile={selectedProfile} /> // 선택한 프로필 전달
              )}
            </View>
          )}
        </View>
      </ScrollView>

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
    paddingBottom: 80,
    zIndex: 1,
  },
  content: {
    paddingLeft: 10,
  },
});

export default HomeScreen;
