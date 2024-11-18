import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import moment from 'moment';

const WeekDays = ({ currentWeek }) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD')); // 선택된 날짜
  const [weekDates, setWeekDates] = useState([]); // 현재 주의 날짜 배열

  useEffect(() => {
    const startOfWeek = currentWeek.clone().startOf('week'); // 전달된 currentWeek의 일요일 계산
    const dates = Array.from({ length: 7 }, (_, index) =>
      startOfWeek.clone().add(index, 'days')
    );
    setWeekDates(dates); // 해당 주의 날짜 배열로 설정
  }, [currentWeek]);

  // 요일 스타일 설정
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
            onPress={() => setSelectedDate(dateObj.format('YYYY-MM-DD'))}
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
    width: 46, // 각 날짜 컨테이너의 너비 고정
    height: 65, // 컨테이너 높이
    borderTopEndRadius: 8,
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    lineHeight: 25,
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    fontWeight: '600',
    lineHeight: 19,
  },
  // 요일/날짜 스타일
  sundayText: {
    color: '#FF7F66',
  },
  sundayDateText: {
    color: '#FF5500',
  },
  saturdayText: {
    color: '#FFB266',
  },
  saturdayDateText: {
    color: '#FF7F00',
  },
  weekdayText: {
    color: '#686664',
  },
  weekdayDateText: {
    color: '#343332',
  },
  // 선택된 날짜 스타일
  selectedContainer: {
    backgroundColor: '#FF7F00',
    borderTopLeftRadius: 10, // 왼쪽 상단 둥근 모서리
    borderTopRightRadius: 10,
    paddingVertical: 6,
  },
  selectedDayText: {
    color: '#FDFCFC',
  },
  selectedDateText: {
    color: '#FDFCFC',
  },
});

export default WeekDays;
