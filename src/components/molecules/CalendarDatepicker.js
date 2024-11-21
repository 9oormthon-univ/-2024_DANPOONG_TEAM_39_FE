import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'; // Feather 아이콘 사용
import DateTimePicker from '@react-native-community/datetimepicker'; // 날짜 선택기
import moment from 'moment';
import CalendarButton from '../atoms/CalendarButton';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const CalendarDatepicker = ({ currentWeek, setCurrentWeek }) => {
  const [showDatePicker, setShowDatePicker] = useState(false); // 날짜 선택기 표시 여부 상태
  const today = moment().startOf('week'); // 오늘 날짜의 주 시작일 계산

  // 이전 주로 이동하는 함수
  const handlePrevWeek = () => {
    const newWeek = moment(currentWeek).subtract(1, 'week');
    setCurrentWeek(newWeek);
  };

  // 다음 주로 이동하는 함수
  const handleNextWeek = () => {
    const newWeek = moment(currentWeek).add(1, 'week');
    setCurrentWeek(newWeek);
  };

  // 날짜 선택기를 열고 처리하는 함수
  const handleDatePicker = () => {
    setShowDatePicker(true);
  };

  // 날짜 선택기에서 날짜가 선택되었을 때 처리
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newWeek = moment(selectedDate).startOf('week'); // 선택된 날짜의 해당 주 계산
      setCurrentWeek(newWeek); // 선택된 주로 변경
    }
  };

  // 오늘 날짜로 이동하는 함수
  const handleTodayPress = () => {
    setCurrentWeek(today); // 오늘 날짜로 이동
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {/* datepicker */}
        <TouchableOpacity onPress={handlePrevWeek} style={styles.chevron}>
          <Feather name="chevron-left" size={24} color="#000" />
        </TouchableOpacity>

        {/* 현재 년/월 표시 */}
        <TouchableOpacity onPress={handleDatePicker} style={styles.dateContainer}>
          <Text style={styles.dateText}>{moment(currentWeek).format('YYYY년 MM월')}</Text>
        </TouchableOpacity>

        {/* 캘린더 아이콘 */}
        <TouchableOpacity onPress={handleDatePicker} style={styles.calendarIconContainer}>
          <Image source={require('../../assets/images/calendar.png')} style={styles.calendarIcon} />
        </TouchableOpacity>

        {/* 오른쪽 Chevron 버튼 */}
        <TouchableOpacity onPress={handleNextWeek} style={styles.chevron}>
          <Feather name="chevron-right" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.rightSection}>
        {/* Today 버튼 (오늘이 아닌 주 선택 시 표시) */}
        {!currentWeek.isSame(today, 'week') && (
          <TouchableOpacity onPress={handleTodayPress} style={styles.todayButton}>
            <Text style={styles.todayButtonText}>Today</Text>
          </TouchableOpacity>
        )}

        {/* 주 버튼 */}
        <CalendarButton />
      </View>

      {/* 날짜 선택기 */}
      {showDatePicker && (
        <DateTimePicker
          value={currentWeek.toDate()} // 현재 주의 날짜
          mode="date"
          display="default" // iOS/Android 기본 표시 방식
          onChange={onDateChange} // 날짜 선택 시 호출
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 가로 방향 정렬
    alignItems: 'center', // 세로 가운데 정렬
    justifyContent: 'space-between', // 왼쪽과 오른쪽에 배치
    paddingHorizontal: 16, // 좌우 여백
    paddingVertical: 16, // 상하 여백
  },
  leftSection: {
    flexDirection: 'row', // 가로 방향 정렬
    alignItems: 'center', // 세로 가운데 정렬
    flex: 1, // 남은 공간을 차지
  },
  rightSection: {
    flexDirection: 'row', // 가로로 Today 버튼과 주 버튼 배치
    alignItems: 'center', // 세로 가운데 정렬
    justifyContent: 'flex-end',
  },
  chevron: {
    paddingHorizontal: 5, // Chevron 버튼의 좌우 여백
  },
  dateContainer: {
    marginRight: 8, // 날짜와 캘린더 아이콘 간격 조정
  },
  dateText: {
    fontSize: 16, // 텍스트 크기
    fontFamily: fonts.semiBold, // Pretendard 폰트 설정
    textAlign: 'left', // 왼쪽 정렬
    lineHeight: 24, // 텍스트 줄 높이
    color: colors.gray900, // 텍스트 색상
  },
  todayButton: {
    width: 65, // 버튼 너비
    height: 32, // 버튼 높이
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
    paddingVertical: 5,
    paddingHorizontal: 13,
    backgroundColor: '#FFE5CC',
    borderRadius: 57,
    marginRight: 10, // Today 버튼과 주 버튼 간격 조정
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
