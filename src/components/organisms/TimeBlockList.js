import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import AlertIcon from '../../assets/images/alert.png'; // PNG 이미지 가져오기
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

const TimeBlockList = ({ tasks, weekDates }) => {
  const [popupVisible, setPopupVisible] = useState(false); // 팝업 상태
  const [popupInfo, setPopupInfo] = useState(null); // 팝업에 표시할 정보

  const categoryColors = {
    'meal': colors.scheduleMeal,
    'hospital': colors.scheduleHospital,
    'medication': colors.scheduleMeal,
    'rest': colors.scheduleBreak,
    'others': colors.scheduleEtc,
    'myCalendar': colors.gray400,
  };

  const handleOpenPopup = (time, endTime, date) => {
    setPopupInfo({ time, endTime, date }); // 팝업에 표시할 정보 설정
    console.log("위클리팝업ㄴㄴ"+date, time, endTime);
    setPopupVisible(true); // 팝업 열기
  };

  const handleClosePopup = () => {
    setPopupVisible(false); // 팝업 닫기
  };

  return (
      <View style={styles.timelineContainer}>
        {/* 시간 슬롯 표시: 오전 9시부터 시작 */}
        {Array.from({ length: 24 - START_HOUR }).map((_, index) => (
            <View
                key={index + START_HOUR}
                style={[styles.timeSlot, index === 0 && styles.firstTimeSlot]}
            >
              <Text style={styles.timeText}>
                {index + START_HOUR < 12 ? '오전\n' : '오후\n'}{' '}
                {(index + START_HOUR) % 12 === 0 ? 12 : (index + START_HOUR) % 12}시
              </Text>
            </View>
        ))}

        {/* 날짜별 Task 처리 */}
        {weekDates.map((weekDate) => {
          const tasksOnDate = tasks
              .filter((task) => task.date === weekDate.format('YYYY-MM-DD'))
              .sort((a, b) => timeToPosition(a.startTime) - timeToPosition(b.startTime));

          return tasksOnDate.map((task, index) => {
            const top = timeToPosition(task.startTime);
            const height = calculateBlockHeight(task.startTime, task.endTime);

            const currentDay = weekDates.findIndex(
                (date) => date.format('YYYY-MM-DD') === task.date
            );

            if (currentDay === -1) return null;

            const totalWidth = 100 - LEFT_PADDING - RIGHT_PADDING - GAP_BETWEEN_COLUMNS * (DAYS_IN_WEEK - 1);
            const widthPercentage = totalWidth / DAYS_IN_WEEK;
            const leftPercentage = LEFT_PADDING + currentDay * (widthPercentage + GAP_BETWEEN_COLUMNS);

            const backgroundColor = categoryColors[task.category];

            // 공백 계산
            if (index > 0) {
              const previousTask = tasksOnDate[index - 1];
              const prevEnd = timeToPosition(previousTask.endTime);
              const currentStart = top;

              if (currentStart > prevEnd) {
                const gapHeight = currentStart - prevEnd;

                return (
                    <React.Fragment key={`gap-${task.id}`}>
                      {/* 공백 블록 */}
                      <TouchableOpacity
                          style={[
                            styles.alertBlock,
                            {
                              top: prevEnd,
                              height: gapHeight,
                              left: `${leftPercentage}%`,
                              width: `${widthPercentage}%`,
                            },
                          ]}
                          onPress={() =>
                              handleOpenPopup(task.startTime, previousTask.endTime, task.date)
                          } // 팝업 열기
                      >
                        <View style={styles.alertIcon}>
                          <Image source={AlertIcon} style={styles.alertIconImage} />
                        </View>
                      </TouchableOpacity>

                      {/* 현재 Task */}
                      <View
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
                    </React.Fragment>
                );
              }
            }

            // Task 블록 렌더링
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
          <Popup
              info={popupInfo}
              onClose={handleClosePopup}
              time={popupInfo?.time}  // popupInfo에서 time 전달
              endTime={popupInfo?.endTime}  // popupInfo에서 endTime 전달
              date={popupInfo?.date}  // popupInfo에서 date 전달
          />
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
  alertBlock: {
    position: 'absolute',
    backgroundColor: colors.primary003,
    borderRadius: 8,
    zIndex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  alertIcon: {
    position: 'absolute',
    top: -10,
    alignSelf: 'center',
    zIndex: 2,
  },
  alertIconImage: {
    left: -3,
    width: 50,
    height: 50,
  },
});

export default TimeBlockList;
