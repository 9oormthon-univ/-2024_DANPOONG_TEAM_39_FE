import { LogBox } from 'react-native';

// 특정 경고 메시지 무시
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import DailyScheduleDefault from '../atoms/DailyScheduleDefault';
import DailySchedulePill from '../atoms/DailySchedulePill';
import MockTasks from '../../datas/MockTasks'; // Mock 데이터 가져오기
import colors from '../../styles/colors'; // 색상 가져오기

const DailySchedule2 = ({ selectedDate }) => {
  // 선택된 날짜에 해당하는 일정 필터링
  const filteredSchedule = MockTasks.filter((task) => task.date === selectedDate);

  const renderScheduleItem = ({ item }) => {
    // category에 따라 컴포넌트와 색상 선택
    const getScheduleComponent = (category) => {
      switch (category) {
        case 'meal':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleMeal,
          };
        case 'hospital':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleHospital,
          };
        case 'medication':
          return {
            Component: DailySchedulePill,
            color: colors.scheduleMeal,
          };
        case 'rest':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleBreak,
          };
        case 'others':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleEtc,
          };
        case 'myCalendar':
          return {
            Component: DailyScheduleDefault,
            color: colors.gray400,
          };
        default:
          return {
            Component: DailyScheduleDefault,
            color: colors.gray400, // 기본 색상
          };
      }
    };

    const { Component, color } = getScheduleComponent(item.category);

    // 일정 컴포넌트 렌더링
    return (
      <Component
        time={item.startTime}
        title={item.title}
        location={item.location}
        isAlarm={item.isAlarm} // MockTasks에서 가져온 값 적용
        hasRecommendation={item.hasRecommendation} // MockTasks에서 가져온 값 적용
        isShared={item.isShared} // MockTasks에서 가져온 값 적용
        color={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSchedule}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => `${item.category || 'empty'}-${index}`}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContainer: {
    paddingVertical: 16,
  },
});

export default DailySchedule2;
