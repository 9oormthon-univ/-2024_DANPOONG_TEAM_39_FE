import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // Feather 아이콘 사용
import DateTimePicker from '@react-native-community/datetimepicker'; // 날짜 선택
import moment from 'moment';
import CalendarButton from '../atoms/CalendarButton';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const CalendarDatepicker = ({ currentWeek, setCurrentWeek, onChangeView }) => {
  const [showDatePicker, setShowDatePicker] = useState(false); // 날짜 선택기 표시 여부 상태
  const today = moment().startOf('week'); // 오늘 날짜의 주 시작일 계산

  const handlePrevWeek = () => {
    const newWeek = moment(currentWeek).subtract(1, 'week');
    setCurrentWeek(newWeek);
  };

  const handleNextWeek = () => {
    const newWeek = moment(currentWeek).add(1, 'week');
    setCurrentWeek(newWeek);
  };

  const handleDatePicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newWeek = moment(selectedDate).startOf('week');
      setCurrentWeek(newWeek);
    }
  };

  const handleTodayPress = () => {
    setCurrentWeek(today);
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <TouchableOpacity onPress={handlePrevWeek} style={styles.chevron}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDatePicker} style={styles.dateContainer}>
          <Text style={styles.dateText}>{moment(currentWeek).format('YYYY년 MM월')}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDatePicker} style={styles.calendarIconContainer}>
          <Image source={require('../../assets/images/calendar.png')} style={styles.calendarIcon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNextWeek} style={styles.chevron}>
          <Feather name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        {!currentWeek.isSame(today, 'week') && (
          <TouchableOpacity onPress={handleTodayPress} style={styles.todayButton}>
            <Text style={styles.todayButtonText}>Today</Text>
          </TouchableOpacity>
        )}
        <CalendarButton onChangeView={onChangeView} />
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={currentWeek.toDate()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  chevron: {
    paddingHorizontal: 5,
  },
  dateContainer: {
    marginRight: 8,
  },
  dateText: {
    fontSize: 16, // 텍스트 크기
    fontFamily: fonts.semiBold, // Pretendard 폰트 설정
    textAlign: 'left', // 왼쪽 정렬
    lineHeight: 24, // 텍스트 줄 높이
    color: colors.gray900, // 텍스트 색상
  },
  todayButton: {
    width: 65,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: '#FFE5CC',
    borderRadius: 57,
    marginRight: 10,
  },
  todayButtonText: {
    color: '#FF7F00',
    fontFamily: fonts.semiBold,
    fontWeight: '700', 
    lineHeight: 24, // 피그마에서 지정된 Line Height
    fontSize: 14,
  },
});

export default CalendarDatepicker;
