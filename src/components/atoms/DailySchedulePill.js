import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlarmIcon from '../../assets/images/daily_alarm.svg';
import CheckboxTrueIcon from '../../assets/images/daily_checkbox_true.svg';
import CheckboxFalseIcon from '../../assets/images/daily_checkbox_false.svg';
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';

const DailySchedulePill = ({
                             id,
                             time,
                             title,
                             hasAlarm = true,
                             color = colors.gray400,
                           }) => {
  const [isChecked, setIsChecked] = useState(false);

  const saveState = async (newState) => {
    try {
      console.log(`Saving state for ${id}:`, newState); // 저장 시 로그 출력
      await AsyncStorage.setItem(`@DailySchedule_${id}`, JSON.stringify(newState));
    } catch (error) {
      console.error('Error saving state:', error);
    }
  };

  const loadState = async () => {
    try {
      const savedState = await AsyncStorage.getItem(`@DailySchedule_${id}`);
      console.log(`Loaded state for ${id}:`, savedState); // 로드 시 로그 출력
      if (savedState !== null) {
        setIsChecked(JSON.parse(savedState));
      }
    } catch (error) {
      console.error('Error loading state:', error);
    }
  };

  useEffect(() => {
    loadState(); // 함수 호출
  }, [loadState]);

  const toggleCheckbox = () => {
    const newState = !isChecked;
    setIsChecked(newState);
    saveState(newState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{time}</Text>
        <View style={[styles.circle, { backgroundColor: color }]} />
      </View>

      <View style={styles.box}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {hasAlarm && <AlarmIcon style={styles.alarmIcon} width={16} height={16} />}
        </View>

        <TouchableOpacity onPress={toggleCheckbox}>
          {isChecked ? (
            <CheckboxTrueIcon style={styles.checkboxIcon} width={24} height={24} />
          ) : (
            <CheckboxFalseIcon style={styles.checkboxIcon} width={24} height={24} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 23,
  },
  timeText: {
    ...textStyles.caption11Medium,
    color: colors.gray400,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  box: {
    width: '80%',
    height: 51,
    borderRadius: 8,
    backgroundColor: colors.white000,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...textStyles.title14Bold,
    color: colors.gray800,
    marginRight: 4,
  },
  alarmIcon: {
    marginLeft: 4,
  },
  checkboxIcon: {
    marginLeft: 4,
  },
});

export default DailySchedulePill;
