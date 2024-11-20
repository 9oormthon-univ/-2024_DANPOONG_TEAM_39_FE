import React, { useState, useRef } from 'react';
import { View, Animated, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/templates/Header';
import FamilyList from '../components/organisms/FamilyList';
import CalendarDatepicker from '../components/molecules/CalendarDatepicker';
import WeekDays from '../components/organisms/WeekDays';
import TimeLine from '../components/atoms/TimeLine';
import TimeBlockList from '../components/organisms/TimeBlockList';
import Daily from '../components/organisms/Daily';
import MockTasks from '../datas/MockTasks';
import FloatingButton from '../components/atoms/FloatingButton';
import moment from 'moment';
import 'moment/locale/ko';
import colors from '../styles/colors';

moment.locale('ko');

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('week'));
  const [viewMode, setViewMode] = useState('주');

  const handleViewChange = (newView) => {
    console.log('ViewMode :', newView); // 상태 확인
    setViewMode(newView);
  };

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

  const profiles = [
    { name: '김수한무거', imagePath: require('../assets/images/profile_me.png') },
    { name: '박수한무거', imagePath: require('../assets/images/profile.png') },
  ];

  const hours = Array.from({ length: 24 }, (_, index) => index);

  return (
    <View style={styles.container}>
      <Header />

      <Animated.View
        style={[
          styles.familyListContainer,
          { height: familyListHeight, opacity: familyListOpacity },
        ]}
      >
        <FamilyList profiles={profiles} />
      </Animated.View>

      <View style={styles.datePickerContainer}>
        <CalendarDatepicker
          currentWeek={currentWeek}
          setCurrentWeek={setCurrentWeek}
          onChangeView={handleViewChange}
        />
        <WeekDays currentWeek={currentWeek} />
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ flexGrow: 1 }} // 내용이 부족해도 스크롤이 가능하게 함
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        keyboardShouldPersistTaps="handled" // 키보드 관련 스크롤 이슈 해결
        nestedScrollEnabled={true} // 자식 ScrollView가 스크롤 가능하게 함
      >
        <View style={styles.content}>
          {viewMode === '주' ? (
            <>
              {hours.map((hour) => (
                <TimeLine key={hour} hour={hour} />
              ))}
              <TimeBlockList tasks={MockTasks} />
            </>
          ) : (
            <Daily />
          )}
        </View>
      </ScrollView>

      <FloatingButton />
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
    overflow: 'hidden',
  },
  content: {
    paddingLeft: 10,
  },
});

export default HomeScreen;
