import { LogBox } from 'react-native';

// 특정 경고 메시지를 무시
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
  'Encountered two children with the same key', // 중복된 키에 대한 경고 무시
]);

import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import DailyScheduleDefault from '../atoms/DailyScheduleDefault';
import DailyScheduleEmpty from '../atoms/DailyScheduleEmpty';
import DailySchedulePill from '../atoms/DailySchedulePill';
import colors from '../../styles/colors';

const DailySchedule = () => {
  const schedule = [
    { type: 'default', startTime: '09:00', endTime: '10:00', title: '아침 식사', location: '집', hasAlarm: true, hasRecommendation: false, hasDolbomi: true, color: colors.scheduleMeal },
    { type: 'default', startTime: '11:00', endTime: '12:00', title: '노인정 가기', location: '노인정', hasAlarm: false, hasRecommendation: true, hasDolbomi: true, color: colors.scheduleBreak },
    { type: 'default', startTime: '12:00', endTime: '13:00', title: '점심 식사', location: '데이케어센터', hasAlarm: false, hasRecommendation: true, hasDolbomi: true, color: colors.scheduleMeal },
    { type: 'default', startTime: '13:00', endTime: '16:00', title: '데이케어센터 가기', location: '데이케어센터', hasAlarm: false, hasRecommendation: true, hasDolbomi: true, color: colors.scheduleEtc },
    { type: 'default', startTime: '18:00', endTime: '19:00', title: '저녁 식사', location: '데이케어센터', hasAlarm: false, hasRecommendation: true, hasDolbomi: true, color: colors.scheduleMeal },
    { type: 'default', startTime: '20:00', endTime: '21:00', title: '잘 준비 하기', location: '집', hasAlarm: false, hasRecommendation: true, hasDolbomi: true, color: colors.scheduleEtc },
    { type: 'pill', startTime: '16:00', endTime: '17:00', title: '저녁 약 복용', hasAlarm: true, isChecked: false, color: colors.secondary002, id: 'task' },
  ];

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

  const renderScheduleItem = ({ item }) => {
    if (item.type === 'default') {
      return (
        <DailyScheduleDefault
          time={item.startTime}
          title={item.title}
          location={item.location}
          hasAlarm={item.hasAlarm}
          hasRecommendation={item.hasRecommendation}
          hasDolbomi={item.hasDolbomi}
          color={item.color}
        />
      );
    }
    if (item.type === 'empty') {
      return (
        <DailyScheduleEmpty
          time={item.startTime}
          endTime={item.endTime}
          color={item.color}
        />
      );
    }
    if (item.type === 'pill') {
      return (
        <DailySchedulePill
          time={item.startTime}
          title={item.title}
          hasAlarm={item.hasAlarm}
          isChecked={item.isChecked}
          color={item.color}
        />
      );
    }
    return null;
  };

  return (
    <FlatList
      data={completeSchedule}
      renderItem={renderScheduleItem}
      keyExtractor={(item, index) => `${item.type}-${index}`}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
  },
});

export default DailySchedule;
