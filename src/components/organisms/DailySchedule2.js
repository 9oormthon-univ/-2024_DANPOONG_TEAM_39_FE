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

  const eventTypeColors = {
    수업: '#9CBA90',
    약속: '#7CC1C7',
    집안일: '#84929B',
  };

  // API에서 데이터 가져오기
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(`Fetching tasks for Profile ID: ${selectedProfile.id}`);
        const response = await axios.get(`http://34.236.139.89:8080/api/calendar/${selectedProfile.id}`);
        console.log('API Response Data:', response.data);
        const apiTasks = response.data.data.map((task, index) => ({
          id: String(index + 1),
          category: task.category || null,
          eventType: task.eventType || null,
          title: task.title || 'No Title',
          date: task.date || '2024-12-01',
          startTime: task.startTime.slice(0, 5) || '00:00',
          endTime: task.endTime.slice(0, 5) || '00:00',
          isAlarm: task.isAlarm || false,
          hasRecommendation: task.hasRecommendation || false,
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

  // 선택된 날짜에 해당하는 일정 필터링 및 시간순 정렬
  const filteredSchedule = mockTasks
    .filter((task) => task.date === selectedDate)
    .sort((a, b) => {
      // 시간을 분 단위로 변환하여 비교
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };
      return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
    });

  const renderScheduleItem = ({ item }) => {
    // category 및 eventType에 따라 컴포넌트와 색상 선택
    const getScheduleComponent = (category, eventType) => {
      if (category === 'myCalendar') {
        const eventTypeColor = eventTypeColors[eventType];
        return {
          Component: DailyScheduleDefault,
          color: eventTypeColor || colors.gray400, // eventType이 없거나 매칭되지 않는 경우 기본 색상
        };
      }

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
        default:
          return {
            Component: DailyScheduleDefault,
            color: colors.gray400,
          };
      }
    };

    const { Component, color } = getScheduleComponent(item.category, item.eventType);

    // 일정 컴포넌트 렌더링
    return (
      <Component
        time={item.startTime}
        title={item.title}
        location={item.location}
        isAlarm={item.isAlarm}
        hasRecommendation={item.hasRecommendation}
        isShared={item.isShared}
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
