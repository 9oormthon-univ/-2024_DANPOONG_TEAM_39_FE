import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

// 일정 높이를 계산하는 함수
const calculateHeight = (startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const hourDiff = endHour - startHour;
  const minuteDiff = endMinute - startMinute;

  let height = 77 * hourDiff + (minuteDiff / 5) * 6.5;
  if (minuteDiff > 0) {
    height += 1; // 구분선 추가 높이
  }

  return height;
};

const TimeBlock = ({ task }) => {
  const { title, startTime, endTime } = task;

  const height = calculateHeight(startTime, endTime);
  //console.log('Height:', height);
  return (
    <View style={[styles.timeBlock, { height }]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timeBlock: {
    position: 'relative',
    left: 28, // 타임라인 옆 간격
    width: 46,
    backgroundColor: colors.scheduleBreak,
    borderRadius: 8,
    paddingLeft: 4,
    paddingRight: 8,
    paddingTop: 4,
    paddingBottom: 4,
    marginBottom: 2,
  },
  title: {
    color: colors.white000,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
});

export default TimeBlock;
