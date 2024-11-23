import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TimePicker from '../atoms/TimePicker'; // TimePicker 컴포넌트 임포트
import Icon from 'react-native-vector-icons/Ionicons'; // 체크박스 아이콘
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const StartTimeEndTime = () => {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태 추가

  const sleepTimeStart = 22; // 수면 시작 시간
  const sleepTimeEnd = 6; // 수면 종료 시간

  const calculateTotalTime = (start, end) => {
    if (!start || !end) return '0';

    const [startPeriod, startHourMinute] = start.split(' ');
    const [startHour, startMinute] = startHourMinute.split(':').map(Number);
    const [endPeriod, endHourMinute] = end.split(' ');
    const [endHour, endMinute] = endHourMinute.split(':').map(Number);

    const start24Hour = startPeriod === '오후' && startHour !== 12 ? startHour + 12 : startHour;
    const end24Hour = endPeriod === '오후' && endHour !== 12 ? endHour + 12 : endHour;

    const startTimeInMinutes = start24Hour * 60 + startMinute;
    const endTimeInMinutes = end24Hour * 60 + endMinute;

    const totalMinutes =
      endTimeInMinutes >= startTimeInMinutes
        ? endTimeInMinutes - startTimeInMinutes
        : 24 * 60 - (startTimeInMinutes - endTimeInMinutes);

    const hours = Math.floor(totalMinutes / 60);
    return `${hours}`;
  };

  const handleToggle = () => {
    setIsChecked(!isChecked); // 체크박스 상태 토글
    if (!isChecked) {
      setStartTime(`오전 ${sleepTimeEnd}:00`);
      setEndTime(`오후 ${(sleepTimeStart % 12 || 12)}:00`);
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };

  const totalTime = calculateTotalTime(startTime, endTime);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.requiredMarker}>*</Text>
        <Text style={styles.label}>일정 시작/종료 시간</Text>
      </View>

      {/* 시작 시간 */}
      <View style={styles.timeRow}>
        <TimePicker placeholder="시작 시간" onTimeChange={setStartTime} />
        <Text style={styles.timeLabel}>부터</Text>
      </View>

      {/* 종료 시간 */}
      <View style={styles.timeRow}>
        <TimePicker placeholder="종료 시간" onTimeChange={setEndTime} />
        <Text style={styles.timeLabel}>까지</Text>
      </View>

      {/* 총 시간 및 체크박스 */}
      <View style={styles.summaryRow}>
        <Text style={styles.totalTime}>
          <Text style={styles.grayText}>총 </Text>
          <Text style={styles.timeValue}>{totalTime}</Text>
          <Text style={styles.grayText}> 시간</Text>
        </Text>
        <TouchableOpacity
          style={[
            styles.checkBox,
            { backgroundColor: isChecked ? colors.primary004 : colors.gray200 },
          ]}
          onPress={handleToggle}
        >
          {isChecked && <Icon name="checkmark" size={20} color={colors.primary001} />}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requiredMarker: {
    fontSize: 16,
    color: colors.primary001,
    marginRight: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginBottom: 16,
    color: colors.gray800,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  timeLabel: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    marginLeft: 8,
    color: colors.gray900,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  totalTime: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
  },
  grayText: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
  },
  timeValue: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.primary001,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartTimeEndTime;
