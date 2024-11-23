import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';
import EmptyIcon from '../../assets/images/daily_empty.svg';
import NextIcon from '../../assets/images/daily_empty_next.svg';

const DailyScheduleEmpty = ({ time, endTime, color = colors.gray400 }) => {
  return (
    <View style={styles.container}>
      {/* 시작 시간과 점 */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <View style={[styles.circle, { backgroundColor: color }]} />
      </View>

      {/* 박스 */}
      <View style={styles.box}>
        {/* 아이콘과 시간 */}
        <View style={styles.textContainer}>
          <EmptyIcon width={24} height={24} style={styles.emptyIcon} />
          <Text style={styles.timeRangeText}>{`${time} ~ ${endTime}`}</Text>
        </View>

        {/* 공백 발생 텍스트 */}
        <Text style={styles.emptyText}>돌봄 공백이 발생했어요.</Text>

        {/* 오른쪽 아이콘 */}
        <NextIcon width={24} height={24} style={styles.nextIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 23,
  },
  timeText: {
    ...textStyles.caption11Medium,
    color: colors.gray400,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  box: {
    width: '77%',
    height: 81,
    borderRadius: 8,
    backgroundColor: colors.white000,
    position: 'relative',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    borderWidth: 1, // 스트로크 두께
    borderColor: colors.primary001, // 스트로크 색상
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emptyIcon: {
    marginRight: 4,
  },
  timeRangeText: {
    ...textStyles.title16SemiBold,
    color: colors.gray800,
  },
  emptyText: {
    ...textStyles.subtitle12Medium14,
    color: colors.gray800,
    position: 'absolute',
    bottom: 12,
    left: 20,
  },
  nextIcon: {
    position: 'absolute',
    right: 12, // 박스 오른쪽 여백
    top: '50%', // 세로 중앙
  },
});

export default DailyScheduleEmpty;
