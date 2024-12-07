import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // 체크박스 아이콘
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const TaskIsAlarmed = ({ label = '일정 알림', isAlarmed, onToggleAlarm }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        style={[
          styles.checkBox,
          { backgroundColor: isAlarmed ? colors.primary004 : colors.gray200 },
        ]}
        onPress={() => onToggleAlarm(!isAlarmed)} // 부모 상태 변경
      >
        {isAlarmed && (
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
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800, // 텍스트 색상
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
