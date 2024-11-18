import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../styles/colors';

const TimeLine = ({ hour }) => {
  return (
    <View style={styles.timeSlot}>
      {/* 시간 표시 */}
      <Text style={styles.timeText}>
        {hour === 0
          ? '오전 12시'
          : hour < 12
            ? `오전\n ${hour}시`
            : hour === 12
              ? '오후\n 12시'
              : `오후\n ${hour - 12}시`}
      </Text>
      {/* 구분선 */}
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  timeSlot: {

    flexDirection: 'row', // 가로 배치
    alignItems: 'flex-start', // 세로 정렬
    height: 53, // 각 시간대의 높이
    paddingTop: 35,
  },
  timeText: {
    width: 28, // 시간 텍스트의 고정 너비
    marginTop: -25, //구분선과 중앙정렬
    textAlign: 'center', // 텍스트를 왼쪽으로 정렬
    fontSize: 10, // 적절한 크기로 설정
    color: colors.gray400,
    lineHeight: 12, // 줄 높이를 추가해 두 줄 방지
  },
  divider: {
    flex: 1, // 남은 공간을 채움
    height: 1, // 구분선 두께
    backgroundColor: colors.gray200,
    width: '100%',
    marginTop: -14, // 구분선을 텍스트의 중앙으로 이동
    marginLeft: 3, // 텍스트와의 간격
  },
});

export default TimeLine;
