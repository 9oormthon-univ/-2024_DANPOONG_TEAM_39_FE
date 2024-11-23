import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const CategoryPicker = ({ selectedCategory, onSelectCategory }) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(50)).current; // 초기 높이는 선택된 항목만 보이도록 설정

  const categories = [
    { label: '식사', value: 'meal' },
    { label: '병원', value: 'hospital' },
    { label: '복약', value: 'medication' },
    { label: '휴식', value: 'rest' },
    { label: '기타', value: 'others' },
  ];

  const toggleDropdown = () => {
    if (isDropdownVisible) {
      // 닫힐 때 애니메이션
      Animated.timing(dropdownHeight, {
        toValue: 50, // 닫힌 상태에서는 선택된 항목만 보임
        duration: 300,
        useNativeDriver: false,
      }).start(() => setDropdownVisible(false));
    } else {
      // 열릴 때 애니메이션
      setDropdownVisible(true);
      Animated.timing(dropdownHeight, {
        toValue: categories.length * 50, // 전체 목록이 보이도록 높이 설정
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleSelectCategory = (category) => {
    onSelectCategory(category); // 선택된 값을 부모로 전달
    toggleDropdown(); // 선택 후 드롭다운 닫기
  };

  return (
    <Animated.View style={[styles.container, { height: dropdownHeight }]}>
      <TouchableOpacity style={styles.picker} onPress={toggleDropdown}>
        <Text style={styles.selectedText}>
          {selectedCategory
            ? categories.find((cat) => cat.value === selectedCategory)?.label
            : '카테고리 선택'}
        </Text>
        <Icon
          name={isDropdownVisible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.black000}
        />
      </TouchableOpacity>

      {/* 피커와 드롭다운 목록 사이 구분선 */}
      {isDropdownVisible && <View style={styles.separator} />}

      {/* 드롭다운 목록 */}
      {isDropdownVisible && (
        <FlatList
          data={categories}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dropdownItem,
                item.value === selectedCategory && styles.selectedItem, // 선택된 항목 강조
              ]}
              onPress={() => handleSelectCategory(item.value)}
            >
              <Text
                style={[
                  styles.dropdownText,
                  item.value === selectedCategory && styles.selectedText, // 선택된 텍스트 강조
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    backgroundColor: '#FFF',
    overflow: 'hidden', // 내부 요소가 박스를 벗어나지 않도록 설정
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  separator: {
    height: 1, // 구분선 두께
    backgroundColor: colors.gray200, // 구분선 색상
  },
  selectedText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.primary001,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  selectedItem: {
    backgroundColor: colors.primary050, // 선택된 항목 강조 배경색
  },
  dropdownText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
});

export default CategoryPicker;
