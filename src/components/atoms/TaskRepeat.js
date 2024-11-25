import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import RepeatIcon from '../../assets/images/repeat.svg'; // 아이콘 import
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const TaskRepeat = ({ placeholder = '반복 주기', onSelectOption = () => {} }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const maxHeight = useRef(new Animated.Value(0)).current; // 초기 상태는 닫혀 있음

  const options = ['매일 반복', '매주 반복', '매월 반복'];

  const toggleDropdown = () => {
    Animated.timing(maxHeight, {
      toValue: isDropdownVisible ? 0 : options.length * 50, // 드롭다운 상태에 따라 높이 설정
      duration: 300,
      useNativeDriver: false,
    }).start(() => setDropdownVisible(!isDropdownVisible)); // 애니메이션 후 상태 변경
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    toggleDropdown(); // 선택 후 드롭다운 닫기
    onSelectOption(option); // 선택된 값을 부모로 전달
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
          {options.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dropdownItem,
                item === selectedOption && styles.selectedItem, // 선택된 항목 강조
                index === options.length - 1 && styles.lastItem, // 마지막 항목 처리
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
    marginBottom: 16, // 제목과 드롭다운 사이 여백
  },
  container: {
    alignSelf: 'flex-start', // 컨테이너를 콘텐츠 크기에 맞춤
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    backgroundColor: colors.white000,
    overflow: 'hidden', // 내부 요소가 박스를 벗어나지 않도록 설정
  },
  picker: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: colors.white000,
  },
  buttonContent: {
    flexDirection: 'row', // 텍스트와 아이콘을 가로로 정렬
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.primary001, // 기본 텍스트 색상
  },
  icon: {
    marginLeft: 4, // 텍스트와 아이콘 간격
  },
  dropdownContainer: {
    overflow: 'hidden',
    borderTopWidth: 1, // 드롭다운 버튼과 목록 사이에 구분선 추가
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
    borderBottomWidth: 0, // 마지막 항목 보더 제거
  },
  selectedItem: {
    
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
});

export default TaskRepeat;
