import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import DailyScheduleDefault from '../atoms/DailyScheduleDefault';
import DailyScheduleEmpty from '../atoms/DailyScheduleEmpty';
import DailySchedulePill from '../atoms/DailySchedulePill';
import colors from '../../styles/colors';

const DailySchedule = () => {
  const schedule = [
    { type: 'default', startTime: '09:00', endTime: '10:00', title: '아침 식사', location: '집', hasAlarm: true, hasRecommendation: false, hasDolbomi: true, color: colors.primary001 },
    { type: 'default', startTime: '12:00', endTime: '13:00', title: '점심 회의', location: '회사', hasAlarm: false, hasRecommendation: true, hasDolbomi: true, color: colors.secondary001 },
    { type: 'default', startTime: '18:00', endTime: '19:00', title: '저녁 약속', location: '레스토랑', hasAlarm: true, hasRecommendation: true, hasDolbomi: false, color: colors.gray400 },
    { type: 'pill', startTime: '07:00', endTime: '07:30', title: '아침 약 복용', hasAlarm: true, isChecked: true, color: colors.primary001 },
    { type: 'pill', startTime: '20:00', endTime: '20:30', title: '점심 약 복용', hasAlarm: false, isChecked: true, color: colors.secondary002 },
    { type: 'pill', startTime: '20:30', endTime: '21:00', title: '저녁 약 복용', hasAlarm: true, isChecked: false, color: colors.secondary002 },
    { type: 'pill', startTime: '01:30', endTime: '21:00', title: '저녁 약 복용', hasAlarm: true, isChecked: false, color: colors.secondary002 },
    { type: 'pill', startTime: '18:30', endTime: '21:00', title: '저녁 약 복용', hasAlarm: true, isChecked: false, color: colors.secondary002 },
    { type: 'pill', startTime: '14:30', endTime: '21:00', title: '저녁 약 복용', hasAlarm: true, isChecked: false, color: colors.secondary002 },
  ];

  // 시작 시간 기준으로 정렬
  const sortedSchedule = [...schedule].sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.startTime}:00Z`);
    const timeB = new Date(`1970-01-01T${b.startTime}:00Z`);
    return timeA - timeB;
  });

  // 빈 시간 계산 및 데이터에 추가
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
    paddingHorizontal: 8,
    backgroundColor: 'transparent', // 배경색 투명
  },
});

export default DailySchedule;
