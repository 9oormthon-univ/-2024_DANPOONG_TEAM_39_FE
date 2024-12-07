import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);

import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import DailyScheduleDefault from '../atoms/DailyScheduleDefault';
import DailyScheduleEmpty from '../atoms/DailyScheduleEmpty';
import DailySchedulePill from '../atoms/DailySchedulePill';
import axios from 'axios';
import colors from '../../styles/colors'; // 색상 가져오기

const DailySchedule = ({ selectedDate }) => {
  const [mockTasks, setMockTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://34.236.139.89:8080/api/careCalendar/all');
        const tasks = response.data.map((task) => ({
          id: String(task.id),
          category: task.category || 'others',
          title: task.title || 'No Title',
          date: task.date || '2024-12-01',
          startTime: task.startTime.slice(0, 5) || '00:00',
          endTime: task.endTime.slice(0, 5) || '00:00',
          isAlarm: task.isAlarm || false,
          hasRecommendation: task.hasRecommendation || false,
          isShared: task.isShared || false,
          location: task.location || 'No Location',
        }));
        setMockTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // 선택된 날짜에 해당하는 일정 필터링
  const filteredSchedule = mockTasks.filter((task) => task.date === selectedDate);

  // 공백 시간을 계산하고 공백 블록 추가
  const calculateEmptyBlocks = (schedule) => {
    const sortedSchedule = [...schedule].sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.startTime}:00Z`);
      const timeB = new Date(`1970-01-01T${b.startTime}:00Z`);
      return timeA - timeB;
    });

    const completeSchedule = [];
    for (let i = 0; i < sortedSchedule.length; i++) {
      completeSchedule.push(sortedSchedule[i]);

      if (i < sortedSchedule.length - 1) {
        const currentEndTime = new Date(`1970-01-01T${sortedSchedule[i].endTime}:00Z`);
        const nextStartTime = new Date(`1970-01-01T${sortedSchedule[i + 1].startTime}:00Z`);

        if (currentEndTime < nextStartTime) {
          completeSchedule.push({
            type: 'empty',
            startTime: sortedSchedule[i].endTime,
            endTime: sortedSchedule[i + 1].startTime,
            color: colors.gray200,
            date: sortedSchedule[i].date,
          });
        }
      }
    }
    return completeSchedule;
  };

  // 공백 시간을 포함한 전체 일정
  const completeSchedule = calculateEmptyBlocks(filteredSchedule);

  const renderScheduleItem = ({ item }) => {
    // 공백 블록 렌더링
    if (item.type === 'empty') {
      return <DailyScheduleEmpty time={item.startTime} endTime={item.endTime} color={item.color} date={item.date} />;
    }

    // category에 따라 컴포넌트와 색상 선택
    const getScheduleComponent = (category) => {
      switch (category) {
        case 'meal':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleMeal,
          };
        case 'hospital':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleHospital,
          };
        case 'medication':
          return {
            Component: DailySchedulePill,
            color: colors.scheduleMeal,
          };
        case 'rest':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleBreak,
          };
        case 'others':
          return {
            Component: DailyScheduleDefault,
            color: colors.scheduleEtc,
          };
        case 'myCalendar':
          return {
            Component: DailyScheduleDefault,
            color: colors.gray400,
          };
        default:
          return {
            Component: DailyScheduleDefault,
            color: colors.gray400, // 기본 색상
          };
      }
    };

    const { Component, color } = getScheduleComponent(item.category);

    // 일정 컴포넌트 렌더링
    return (
      <Component
        time={item.startTime}
        title={item.title}
        location={item.location}
        isAlarm={item.isAlarm} // MockTasks에서 가져온 값 적용
        hasRecommendation={item.hasRecommendation} // MockTasks에서 가져온 값 적용
        isShared={item.isShared} // MockTasks에서 가져온 값 적용
        color={color}
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text></Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={completeSchedule}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => `${item.category || 'empty'}-${index}`}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  listContainer: {
    paddingVertical: 16,
  },
});

export default DailySchedule;
