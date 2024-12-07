import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const WeekDays = ({ currentWeek, onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // 선택된 날짜
  const [weekDates, setWeekDates] = useState([]); // 현재 주의 날짜 배열

  useEffect(() => {
    const startOfWeek = currentWeek.clone().startOf('week'); // 전달된 currentWeek의 일요일 계산
    const dates = Array.from({ length: 7 }, (_, index) =>
      startOfWeek.clone().add(index, 'days')
    );
    setWeekDates(dates); // 해당 주의 날짜 배열로 설정
  }, [currentWeek]);

  const handleDatePress = (date) => {
    setSelectedDate(date); // 내부 상태 업데이트
    onDateSelect(date); // 부모로 선택된 날짜 전달
  };

  const getDayStyles = (day, isSelected) => {
    if (isSelected) {
      return {
        dayText: styles.selectedDayText,
        dateText: styles.selectedDateText,
        container: styles.selectedContainer,
      };
    }

    if (day === '일') {
      return { dayText: styles.sundayText, dateText: styles.sundayDateText };
    } else if (day === '토') {
      return { dayText: styles.saturdayText, dateText: styles.saturdayDateText };
    } else {
      return { dayText: styles.weekdayText, dateText: styles.weekdayDateText };
    }
  };

  return (
    <View style={styles.weekContainer}>
      {weekDates.map((dateObj, index) => {
        const day = dateObj.format('ddd'); // 요일 한 글자 (일, 월, 화...)
        const date = dateObj.format('D'); // 날짜
        const isSelected = selectedDate === dateObj.format('YYYY-MM-DD');
        const { dayText, dateText, container } = getDayStyles(day, isSelected);

        return (
          <TouchableOpacity
            key={index}
            style={[styles.dateContainer, container]}
            onPress={() => handleDatePress(dateObj.format('YYYY-MM-DD'))}
          >
            <Text style={[styles.dayText, dayText]}>{day}</Text>
            <Text style={[styles.dateText, dateText]}>{date}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingLeft: 41,
  },
  dateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 46,
    height: 65,
    borderTopEndRadius: 8,
  },
  dayText: {
    fontSize: 12,
    fontFamily: fonts.medium,
    lineHeight: 25,
  },
  dateText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    lineHeight: 19,
  },
  sundayText: { color: colors.secondary002 },
  sundayDateText: { color: colors.secondary001 },
  saturdayText: { color: colors.primary002 },
  saturdayDateText: { color: colors.primary001 },
  weekdayText: { color: colors.gray700 },
  weekdayDateText: { color: colors.gray900 },
  selectedContainer: {
    backgroundColor: '#FF7F00',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 6,
  },
  selectedDayText: { color: '#FDFCFC' },
  selectedDateText: { color: '#FDFCFC' },
});

export default WeekDays;
