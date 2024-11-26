import React from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import DailyScheduleDefault from '../atoms/DailyScheduleDefault';
import DailyScheduleEmpty from '../atoms/DailyScheduleEmpty';
import DailySchedulePill from '../atoms/DailySchedulePill';
import MockTasks from '../../datas/MockTasks'; // Mock 데이터 가져오기

const DailySchedule = ({ selectedDate }) => {
  // 선택된 날짜에 해당하는 일정 필터링
  const filteredSchedule = MockTasks.filter((task) => task.date === selectedDate);

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
      return <DailyScheduleEmpty time={item.startTime} endTime={item.endTime} color={item.color} />;
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
    <View style={styles.container}>
      <FlatList
        data={filteredSchedule}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => `${item.type}-${index}`}
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
