import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import CalendarDateIcon from '../../assets/images/calendar_date.svg';

const TaskDatePickerButton = ({ defaultText = '일정 일자 선택', onDateChange }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultText);

  const handleConfirm = (event, date) => {
    if (date) {
      const formattedDate = date.toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' });
      setSelectedDate(formattedDate);
      onDateChange?.(formattedDate);
    }
    setPickerVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.requiredMarker}>*</Text>
        <Text style={styles.label}>일정 일자</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setPickerVisible(true)}>
        <Text style={[styles.text, { color: selectedDate === defaultText ? colors.gray400 : colors.gray800 }]}>
          {selectedDate}
        </Text>
        <CalendarDateIcon />
      </TouchableOpacity>

      {isPickerVisible && (
        <Modal transparent={true} animationType="slide" visible={isPickerVisible}>
          <TouchableOpacity style={styles.overlay} onPress={() => setPickerVisible(false)} />
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleConfirm}
          />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  requiredMarker: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold, 
    color: colors.primary001, 
    marginRight: 4 
  },
  label: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold, 
    color: colors.gray800 
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    backgroundColor: colors.white000,
  },
  text: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold, 
    marginRight: 4 
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.4)' 
  },
});

export default TaskDatePickerButton;
