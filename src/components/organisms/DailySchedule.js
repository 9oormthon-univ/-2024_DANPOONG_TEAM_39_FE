import { LogBox } from 'react-native';

// 특정 경고 메시지 무시
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import DailyScheduleDefault from '../atoms/DailyScheduleDefault';
import DailyScheduleEmpty from '../atoms/DailyScheduleEmpty';
import DailySchedulePill from '../atoms/DailySchedulePill';
import MockTasks from '../../datas/MockTasks'; // Mock 데이터 가져오기
import colors from '../../styles/colors'; // 색상 가져오기

const DailySchedule = ({ selectedDate }) => {
  // 선택된 날짜에 해당하는 일정 필터링
  const filteredSchedule = MockTasks.filter((task) => task.date === selectedDate);

  // 공백 시간을 계산하고 공백 블록 추가
  const calculateEmptyBlocks = (schedule) => {
    const sortedSchedule = [...schedule].sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.startTime}:00Z`);
      const timeB = new Date(`1970-01-01T${b.startTime}:00Z`);
      return timeA - timeB;
    });

    const completeSchedule = [];
    for (let i = 0; i < sortedSchedule.length; i++) {
      completeSchedule.push(sortedSchedule[i]);

      if (i < sortedSchedule.length - 1) {
        const currentEndTime = new Date(`1970-01-01T${sortedSchedule[i].endTime}:00Z`);
        const nextStartTime = new Date(`1970-01-01T${sortedSchedule[i + 1].startTime}:00Z`);

        if (currentEndTime < nextStartTime) {
          completeSchedule.push({
            type: 'empty',
            startTime: sortedSchedule[i].endTime,
            endTime: sortedSchedule[i + 1].startTime,
            color: colors.gray200,
          });
        }
      }
    }
    return completeSchedule;
  };

  // 공백 시간을 포함한 전체 일정
  const completeSchedule = calculateEmptyBlocks(filteredSchedule);

  const renderScheduleItem = ({ item }) => {
    // 공백 블록 렌더링
    if (item.type === 'empty') {
      return <DailyScheduleEmpty time={item.startTime} endTime={item.endTime} color={item.color} />;
    }

    // category에 따라 컴포넌트와 색상 선택
    const getScheduleComponent = (category) => {
      switch (category) {
        case '식사':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleMeal,
          };
        case '병원':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleHospital,
          };
        case '복약':
          return {
            Component: DailySchedulePill,
            color: colors.scheduleMeal,
          };
        case '휴식':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleBreak,
          };
        case '기타':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleEtc,
          };
        case '내 일정':
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
        hasAlarm={item.hasAlarm} // MockTasks에서 가져온 값 적용
        hasRecommendation={item.hasRecommendation} // MockTasks에서 가져온 값 적용
        hasDolbomi={item.hasDolbomi} // MockTasks에서 가져온 값 적용
        color={color}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={completeSchedule}
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

export default DailySchedule;
