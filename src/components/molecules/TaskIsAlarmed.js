import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // 체크박스 아이콘
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import ClockCheckIcon from '../../assets/images/clock_check.svg'; // Clock 체크 아이콘

const TaskIsAlarmed = ({ label = '일정 알림' }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked); // 내부 상태만 토글
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelWithIcon}>
        <Text style={styles.label}>{label}</Text>
        <ClockCheckIcon width={24} height={24} style={styles.icon} />
      </View>
      <TouchableOpacity
        style={[
          styles.checkBox,
          { backgroundColor: isChecked ? colors.primary004 : colors.gray200 },
        ]}
        onPress={handleToggle}
      >
        {isChecked && (
          <Icon name="checkmark" size={20} color={colors.primary001} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  labelWithIcon: {
    flexDirection: 'row', // 텍스트와 아이콘을 가로로 배치
    alignItems: 'center', // 수직 가운데 정렬
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800, // 텍스트 색상
  },
  icon: {
    marginLeft: 4, // 텍스트와 아이콘 간의 여백
    width: 24,
    height: 24,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TaskIsAlarmed;
