import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import TimePicker from '../atoms/TimePicker'; // TimePicker 컴포넌트 임포트
import Icon from 'react-native-vector-icons/Ionicons'; // 체크박스 아이콘
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const StartTimeEndTime = ({
  startTime,
  endTime,
  isChecked,
  defaultStart = '오전 6:00',
  defaultEnd = '오후 10:00',
  onStartTimeChange,
  onEndTimeChange,
  onToggleCheck,
}) => {
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

  const totalTime = calculateTotalTime(startTime, endTime);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.requiredMarker}>*</Text>
        <Text style={styles.label}>일정 시작/종료 시간</Text>
      </View>

      {/* 시작 시간 */}
      <View style={styles.timeRow}>
        <TimePicker
          placeholder={isChecked ? defaultStart : '시작 시간'} // 체크박스 상태에 따라 placeholder 변경
          time={startTime}
          onTimeChange={onStartTimeChange} // 부모에게 시작 시간 전달
          editable={!isChecked} // 체크박스 선택 시 비활성화
        />
        <Text style={styles.timeLabel}>부터</Text>
      </View>

      {/* 종료 시간 */}
      <View style={styles.timeRow}>
        <TimePicker
          placeholder={isChecked ? defaultEnd : '종료 시간'} // 체크박스 상태에 따라 placeholder 변경
          time={endTime}
          onTimeChange={onEndTimeChange} // 부모에게 종료 시간 전달
          editable={!isChecked} // 체크박스 선택 시 비활성화
        />
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
          style={styles.checkboxContainer}
          onPress={() => {
            onToggleCheck();
            if (!isChecked) {
              onStartTimeChange(defaultStart); // 기본 시작 시간 설정
              onEndTimeChange(defaultEnd); // 기본 종료 시간 설정
            } else {
              onStartTimeChange(''); // 시간 초기화
              onEndTimeChange('');
            }
          }}
        >
          <View
            style={[
              styles.checkBox,
              { backgroundColor: isChecked ? colors.primary004 : colors.gray200 },
            ]}
          >
            {isChecked && <Icon name="checkmark" size={20} color={colors.primary001} />}
          </View>
          <Text style={styles.checkboxLabel}>종일</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  requiredMarker: {
    fontSize: 16,
    color: colors.primary001,
    marginRight: 4,
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
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
  checkboxContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
    marginRight: 8,
  },
});

export default StartTimeEndTime;
