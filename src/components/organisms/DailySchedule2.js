import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);

import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import DailyScheduleDefault from '../atoms/DailyScheduleDefault';
import DailySchedulePill from '../atoms/DailySchedulePill';
import axios from 'axios';
import colors from '../../styles/colors'; // 색상 가져오기

const DailySchedule = ({ selectedDate, selectedProfile }) => {
  const [mockTasks, setMockTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(`Fetching tasks for Profile ID: ${selectedProfile.id}`); // 프로필 ID 확인용 로그
        const response = await axios.get(`http://34.236.139.89:8080/api/calendar/${selectedProfile.id}`);
        const apiTasks = response.data.data.map((task, index) => ({
          id: String(index + 1), // ID가 없으므로 index를 기반으로 생성
          category: task.category || 'others',
          title: task.title || 'No Title',
          date: task.date || '2024-12-01',
          startTime: task.startTime.slice(0, 5) || '00:00',
          endTime: task.endTime.slice(0, 5) || '00:00',
          isAlarm: task.isAlarm || false,
          hasRecommendation: task.hasRecommendation || false, // API에 없는 경우 기본값 설정
          isShared: task.isShared || false,
          location: task.location || 'No Location',
        }));
        setMockTasks(apiTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProfile?.id) {
      fetchTasks();
    }
  }, [selectedProfile]);

  // 선택된 날짜에 해당하는 일정 필터링
  const filteredSchedule = mockTasks.filter((task) => task.date === selectedDate);

  const renderScheduleItem = ({ item }) => {
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
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredSchedule}
        renderItem={renderScheduleItem}
        keyExtractor={(item, index) => `${item.category || 'task'}-${index}`}
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
