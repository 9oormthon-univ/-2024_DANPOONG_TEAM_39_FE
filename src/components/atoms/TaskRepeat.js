import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RepeatIcon from '../../assets/images/repeat.svg'; // repeat.svg 아이콘
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const TaskRepeat = ({ label = '반복 주기', options = ['매일 반복', '매주 반복', '매월 반복'] }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(label);

  const handleOptionPress = (option) => {
    setSelectedOption(option);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Label */}
      <Text style={styles.label}>일정 반복</Text>
      {/* Dropdown Button */}
      <TouchableOpacity
        style={[
          styles.dropdownButton,
          isDropdownVisible && styles.dropdownButtonActive,
        ]}
        onPress={() => setDropdownVisible(!isDropdownVisible)}
      >
        <View style={styles.buttonContent}>
          <Text
            style={[
              styles.selectedText,
              selectedOption === label ? styles.labelText : styles.selectedOptionText,
            ]}
          >
            {selectedOption}
          </Text>
          <RepeatIcon width={16} height={16} style={styles.icon} />
        </View>
      </TouchableOpacity>
      {/* Dropdown Options */}
      {isDropdownVisible && (
        <View style={styles.dropdownOptions}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.option,
                index === options.length - 1 && styles.noBorder, // 마지막 옵션 구분선 제거
              ]}
              onPress={() => handleOptionPress(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  option === selectedOption && styles.selectedOptionText, // 선택된 값 스타일 적용
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
    marginBottom: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16, // 좌우 간격
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  dropdownButtonActive: {
    borderBottomWidth: 0, // 하단 경계선 제거
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttonContent: {
    flexDirection: 'row',
    //alignItems: 'c',
  },
  selectedText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  labelText: {
    color: colors.gray800, // 기본 텍스트 색상
  },
  selectedOptionText: {
    color: colors.primary001, // 선택된 값의 텍스트 색상
  },
  icon: {
    marginLeft: 4,
  },
  dropdownOptions: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderTopWidth: 0, // 상단 경계선 제거
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: colors.white,
  },
  option: {
    paddingHorizontal: 16, // 좌우 간격 드롭다운 버튼과 동일하게 설정
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  noBorder: {
    borderBottomWidth: 0, // 마지막 옵션 구분선 제거
  },
  optionText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
});

export default TaskRepeat;
