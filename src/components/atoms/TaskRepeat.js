import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import RepeatIcon from '../../assets/images/repeat.svg'; // 아이콘 import
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const TaskRepeat = ({ placeholder = '반복 주기', repeatCycle, onSelectOption }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(repeatCycle || null);
  const maxHeight = useRef(new Animated.Value(0)).current; // 초기 상태는 닫혀 있음

  // 동일한 옵션값을 자식 내부에서 관리
  const repeatOptions = ['매일 반복', '매주 반복', '매월 반복'];

  const toggleDropdown = () => {
    Animated.timing(maxHeight, {
      toValue: isDropdownVisible ? 0 : repeatOptions.length * 50, // 드롭다운 상태에 따라 높이 설정
      duration: 300,
      useNativeDriver: false,
    }).start(() => setDropdownVisible(!isDropdownVisible)); // 애니메이션 후 상태 변경
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    toggleDropdown(); // 선택 후 드롭다운 닫기
    onSelectOption?.(option); // 선택된 값을 부모로 전달
  };

  return (
    <View>
      {/* 제목 추가 */}
      <Text style={styles.title}>일정 반복</Text>
      <View style={styles.container}>
        {/* 드롭다운 버튼 */}
        <TouchableOpacity style={styles.picker} onPress={toggleDropdown}>
          <View style={styles.buttonContent}>
            <Text style={styles.selectedText}>
              {selectedOption || placeholder}
            </Text>
            <RepeatIcon width={16} height={16} style={styles.icon} />
          </View>
        </TouchableOpacity>

        {/* 드롭다운 목록 */}
        <Animated.View style={[styles.dropdownContainer, { maxHeight }]}>
          {repeatOptions.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownItem,
                item === selectedOption && styles.selectedItem, // 선택된 항목 강조
                index === repeatOptions.length - 1 && styles.lastItem, // 마지막 항목 처리
              ]}
              onPress={() => handleSelectOption(item)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  item === selectedOption && styles.selectedText, // 선택된 텍스트 강조
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
    marginBottom: 16,
  },
  container: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    backgroundColor: colors.white000,
    overflow: 'hidden',
  },
  picker: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white000,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.primary001,
  },
  icon: {
    marginLeft: 4,
  },
  dropdownContainer: {
    overflow: 'hidden',
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    backgroundColor: colors.white000,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  selectedItem: {
    backgroundColor: colors.primary005,
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
});

export default TaskRepeat;
