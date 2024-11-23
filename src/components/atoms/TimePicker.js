import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Modal } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ClockIcon from '../../assets/images/clock.svg'; // Clock SVG 아이콘
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const TimePicker = ({ placeholder = '시간 선택', onTimeChange }) => {
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleConfirm = (event, date) => {
    if (Platform.OS !== 'ios') {
      setPickerVisible(false); // Android에서는 바로 닫힘
    }
    if (date) {
      const formattedTime = formatTime(date);
      setSelectedTime(formattedTime); // 선택된 시간 저장
      onTimeChange?.(formattedTime); // 선택된 시간 부모 컴포넌트로 전달
    }
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const isAM = hours < 12;

    const formattedHours = (hours % 12 || 12).toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const period = isAM ? '오전' : '오후';

    return `${period} ${formattedHours}:${formattedMinutes}`;
  };

  return (
    <View style={styles.container}>
      {/* 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => setPickerVisible(true)}>
        <Text
          style={[
            styles.text,
            { color: selectedTime ? colors.primary001 : colors.gray400 },
          ]}
        >
          {selectedTime || placeholder}
        </Text>
        <ClockIcon width={20} height={20} />
      </TouchableOpacity>

      {/* iOS Modal 처리 */}
      {isPickerVisible && Platform.OS === 'ios' && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isPickerVisible}
          onRequestClose={() => setPickerVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={false}
                display="spinner"
                onChange={(event, date) => handleConfirm(event, date)}
              />
              <TouchableOpacity
                style={styles.doneButton}
                onPress={() => setPickerVisible(false)}
              >
                <Text style={styles.doneButtonText}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Android 처리 */}
      {isPickerVisible && Platform.OS === 'android' && (
        <DateTimePicker
          value={new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, date) => {
            handleConfirm(event, date);
            setPickerVisible(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white000,
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignItems: 'center',
  },
  doneButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.primary001,
    borderRadius: 8,
  },
  doneButtonText: {
    color: colors.white000,
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});

export default TimePicker;
