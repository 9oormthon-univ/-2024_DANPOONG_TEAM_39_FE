import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AlarmIcon from '../../assets/images/daily_alarm.svg'; // 알람 SVG 파일
import MapIcon from '../../assets/images/daily_map.svg'; // 지도 SVG 파일
import DolbomiTrueIcon from '../../assets/images/daily_dolbomi.svg'; // 돌보미 활성 아이콘
import DolbomiFalseIcon from '../../assets/images/daily_dolbomi_false.svg'; // 돌보미 비활성 아이콘
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';

const DailyScheduleDefault = ({
                                time,
                                title,
                                hasAlarm = false,
                                hasRecommendation = false,
                                location,
                                hasDolbomi = true,
                                color = colors.gray400, // 점과 선의 색상을 하나로 관리
                              }) => {
  return (
    <View style={styles.container}>
      {/* 시간 표시 */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <View style={[styles.circle, { backgroundColor: color }]} />
      </View>

      {/* 박스 */}
      <View style={styles.box}>
        {/* 세로 선 */}
        <View style={[styles.verticalLine, { backgroundColor: color }]} />

        {/* 텍스트와 아이콘 */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {hasAlarm && <AlarmIcon style={styles.alarmIcon} width={16} height={16} />}
        </View>

        {/* 지도 아이콘과 위치 텍스트 */}
        {location && (
          <>
            <MapIcon style={styles.mapIcon} width={16} height={16} />
            <Text style={styles.mapText}>{location}</Text>
          </>
        )}

        {/* 돌보미 아이콘 */}
        {hasDolbomi ? (
          <DolbomiTrueIcon style={styles.dolbomiIcon} width={16} height={16} />
        ) : (
          <DolbomiFalseIcon style={styles.dolbomiIcon} width={16} height={16} />
        )}

        {/* 버튼 */}
        {hasRecommendation && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>활동 추천받기</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // 시간과 박스 배치를 위한 설정
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row', // "오후 12시"와 점을 가로로 배치
    alignItems: 'center',
    marginRight: 23, // 박스 왼쪽으로부터 위치
  },
  timeText: {
    ...textStyles.caption11Medium,
    color: colors.gray400,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4, // 동그란 모양
    marginLeft: 8, // 텍스트로부터 오른쪽으로 8dp
  },
  box: {
    width: '77%',
    height: 81,
    borderRadius: 8,
    backgroundColor: colors.white000,
    position: 'relative',
    paddingHorizontal: 8,
    paddingTop: 9,
    paddingBottom: 12,
  },
  verticalLine: {
    position: 'absolute',
    left: 8, // 박스 내부 왼쪽에서 8dp
    top: 9, // 박스 내부 상단에서 9dp
    height: 60, // 선의 길이
    width: 2, // 선의 두께
    borderRadius: 1, // 선 끝을 둥글게
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12, // 세로선과 텍스트 간격
  },
  title: {
    ...textStyles.title14Bold,
    color: colors.gray800,
    marginRight: 4, // 아이콘과의 간격
  },
  alarmIcon: {
    marginLeft: 4, // 텍스트 오른쪽으로 4dp
  },
  mapIcon: {
    position: 'absolute',
    left: 20,
    bottom: 12,
  },
  mapText: {
    position: 'absolute',
    left: 40, // 지도 아이콘의 오른쪽 간격
    bottom: 13,
    ...textStyles.subtitle12Medium14,
    color: colors.gray800,
  },
  dolbomiIcon: {
    position: 'absolute',
    right: 12,
    bottom: 12,
  },
  button: {
    position: 'absolute',
    right: 12,
    top: 8,
    width: 100,
    height: 24,
    borderRadius: 57,
    backgroundColor: colors.primary005,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    ...textStyles.subtitle14SemiBold24,
    color: colors.primary001,
  },
});

export default DailyScheduleDefault;
