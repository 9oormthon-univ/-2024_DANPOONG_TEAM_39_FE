import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import axios from 'axios';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import Popup from '../atoms/Popup'; // Popup 컴포넌트 가져오기

const HOUR_HEIGHT = 60; // 1시간의 높이를 60px로 설정
const DAYS_IN_WEEK = 7; // 일요일~토요일 기준
const LEFT_PADDING = 7; // 왼쪽 패딩
const RIGHT_PADDING = 2.5; // 오른쪽 패딩
const GAP_BETWEEN_COLUMNS = 1; // 열 사이의 간격
const START_HOUR = 9; // 시작 시간을 오전 9시로 설정

// '10:30' -> 픽셀 단위로 변환
const timeToPosition = (time) => {
  const [hour, minute] = time.split(':').map(Number);
  const relativeHour = hour - START_HOUR; // 오전 9시 기준으로 상대 시간 계산
  return relativeHour * HOUR_HEIGHT + (minute / 60) * HOUR_HEIGHT;
};

// 블록 높이 계산 ('10:30' ~ '11:15')
const calculateBlockHeight = (startTime, endTime) => {
  const start = timeToPosition(startTime);
  const end = timeToPosition(endTime);
  return end - start;
};

const TimeBlockList = ({ weekDates, selectedProfile }) => {
  const [tasks, setTasks] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false); // 팝업 상태
  const [popupInfo, setPopupInfo] = useState(null); // 팝업에 표시할 정보
  const [loading, setLoading] = useState(true);

  // 색상 설정
  const categoryColors = {
    meal: colors.scheduleMeal,
    hospital: colors.scheduleHospital,
    medication: colors.scheduleMeal,
    rest: colors.scheduleBreak,
    others: colors.scheduleEtc,
    myCalendar: colors.gray400,
  };

  const eventTypeColors = {
    수업: '#9CBA90',
    약속: '#7CC1C7',
    집안일: '#84929B',
  };

  // 선택된 프로필 ID를 출력
  useEffect(() => {
    if (selectedProfile) {
      console.log(`Selected Profile ID: ${selectedProfile.id}`); // 선택한 프로필 ID 출력
    }
  }, [selectedProfile]);

  // API 호출
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(`Fetching tasks for Profile ID: ${selectedProfile.id}`); // 콘솔에 추가 로그 출력
        const response = await axios.get(`http://34.236.139.89:8080/api/calendar/${selectedProfile?.id}`);
        const apiTasks = response.data.data.map((task, index) => ({
          id: String(index + 1),
          category: task.category || null,
          eventType: task.eventType || 'others',
          title: task.title || 'No Title',
          date: task.date || '2024-12-01',
          startTime: task.startTime.slice(0, 5) || '00:00',
          endTime: task.endTime.slice(0, 5) || '00:00',
          isAlarm: task.isAlarm || false,
          hasRecommendation: task.hasRecommendation || false,
          isShared: task.isShared || false,
          location: task.location || 'No Location',
        }));
        setTasks(apiTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProfile) {
      fetchTasks();
    }
  }, [selectedProfile]);

  const handleOpenPopup = (startTime, endTime) => {
    setPopupInfo({ startTime, endTime }); // 팝업에 표시할 정보 설정
    setPopupVisible(true); // 팝업 열기
  };

  const handleClosePopup = () => {
    setPopupVisible(false); // 팝업 닫기
  };

  if (loading) {
    return (
      <View style={styles.timelineContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.timelineContainer}>
      {/* 시간 슬롯 표시: 오전 9시부터 시작 */}
      {Array.from({ length: 24 - START_HOUR }).map((_, index) => (
        <View
          key={index + START_HOUR}
          style={[
            styles.timeSlot,
            index === 0 && styles.firstTimeSlot,
          ]}
        >
          <Text style={styles.timeText}>
            {index + START_HOUR < 12 ? '오전\n' : '오후\n'}
            {(index + START_HOUR) % 12 === 0 ? 12 : (index + START_HOUR) % 12}시
          </Text>
        </View>
      ))}

      {/* 날짜별 Task 처리 */}
      {weekDates.map((weekDate) => {
        const tasksOnDate = tasks
          .filter((task) => task.date === weekDate.format('YYYY-MM-DD'))
          .sort((a, b) => timeToPosition(a.startTime) - timeToPosition(b.startTime));

        return tasksOnDate.map((task) => {
          const top = timeToPosition(task.startTime);
          const height = calculateBlockHeight(task.startTime, task.endTime);

          const currentDay = weekDates.findIndex(
            (date) => date.format('YYYY-MM-DD') === task.date
          );

          if (currentDay === -1) return null;

          const totalWidth = 100 - LEFT_PADDING - RIGHT_PADDING - GAP_BETWEEN_COLUMNS * (DAYS_IN_WEEK - 1);
          const widthPercentage = totalWidth / DAYS_IN_WEEK;
          const leftPercentage = LEFT_PADDING + currentDay * (widthPercentage + GAP_BETWEEN_COLUMNS);

          // 색상 결정
          const backgroundColor = task.category === 'myCalendar'
            ? eventTypeColors[task.eventType] || colors.gray400 // eventType에 따라 색상 결정
            : categoryColors[task.category] || colors.gray400; // 기본 category 색상

          return (
            <View
              key={task.id}
              style={[
                styles.block,
                {
                  top,
                  height,
                  left: `${leftPercentage}%`,
                  width: `${widthPercentage}%`,
                  backgroundColor,
                },
              ]}
            >
              <Text style={styles.blockText}>{task.title}</Text>
            </View>
          );
        });
      })}

      {/* 팝업 컴포넌트 */}
      <Modal
        visible={popupVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClosePopup}
      >
        <Popup info={popupInfo} onClose={handleClosePopup} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  timelineContainer: {
    position: 'relative',
    flex: 1,
    backgroundColor: colors.gray050,
    marginTop: 25,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    height: HOUR_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  firstTimeSlot: {
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  timeText: {
    width: 30,
    textAlign: 'left',
    color: colors.gray400,
    fontFamily: fonts.medium,
    fontSize: 11,
  },
  block: {
    position: 'absolute',
    borderRadius: 8,
    padding: 5,
    zIndex: 1,
  },
  blockText: {
    color: '#fff',
    fontFamily: fonts.bold,
    lineHeight: 14,
    fontSize: 12,
  },
});

export default TimeBlockList;
