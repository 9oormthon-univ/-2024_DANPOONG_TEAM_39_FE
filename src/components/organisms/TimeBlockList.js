import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import AlertIcon from '../../assets/images/alert.png'; // PNG 이미지 가져오기

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
  const categoryColors = {
    '식사': colors.scheduleMeal,
    '병원': colors.scheduleHospital,
    '휴식': colors.scheduleBreak,
    '기타': colors.scheduleEtc,
    '내 일정': colors.gray400,
  };

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
            {index + START_HOUR < 12 ? '오전\n' : '오후\n'}{' '}
            {(index + START_HOUR) % 12 === 0 ? 12 : (index + START_HOUR) % 12}시
          </Text>
        </View>
      ))}

      {/* 날짜별 Task 처리 */}
      {weekDates.map((weekDate) => {
        // 같은 날짜의 Task를 필터링하고 시작 시간 순으로 정렬
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
                  <View
                    style={[
                      styles.alertBlock,
                      {
                        top: prevEnd,
                        height: gapHeight,
                        left: `${leftPercentage}%`,
                        width: `${widthPercentage}%`,
                      },
                    ]}
                  >
                    {/* 공백 아이콘 */}
                    <View style={styles.alertIcon}>
                      <Image
                        source={AlertIcon}
                        style={styles.alertIconImage}
                      />
                    </View>
                  </View>

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
    top: -10, // 아이콘 위치 조정
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
