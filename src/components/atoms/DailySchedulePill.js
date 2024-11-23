import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AlarmIcon from '../../assets/images/daily_alarm.svg'; // 알람 SVG 파일
import CheckboxTrueIcon from '../../assets/images/daily_checkbox_true.svg'; // 체크박스 활성화 아이콘
import CheckboxFalseIcon from '../../assets/images/daily_checkbox_false.svg'; // 체크박스 비활성화 아이콘
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';

const DailySchedulePill = ({
                             time,
                             title,
                             hasAlarm = true, // 알람 여부
                             isChecked = false, // 체크박스 상태
                             color = colors.gray400, // 점과 선 색상
                           }) => {
  return (
    <View style={styles.container}>
      {/* 시간과 점 */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <View style={[styles.circle, { backgroundColor: color }]} />
      </View>

      {/* 박스 */}
      <View style={styles.box}>
        {/* 제목 텍스트와 알람 아이콘 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {hasAlarm && <AlarmIcon style={styles.alarmIcon} width={16} height={16} />}
        </View>

        {/* 체크박스 아이콘 */}
        {isChecked ? (
          <CheckboxTrueIcon style={styles.checkboxIcon} width={24} height={24} />
        ) : (
          <CheckboxFalseIcon style={styles.checkboxIcon} width={24} height={24} />
        )}
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
    height: 51, // 상자 높이
    borderRadius: 8,
    backgroundColor: colors.white000,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...textStyles.title14Bold,
    color: colors.gray800,
    marginRight: 4, // 텍스트와 알람 아이콘 간격
  },
  alarmIcon: {
    marginLeft: 4,
  },
  checkboxIcon: {
    marginLeft: 4,
  },
});

export default DailySchedulePill;
