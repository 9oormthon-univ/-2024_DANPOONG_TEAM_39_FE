import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const TypeButton = () => {
  const categories = [
    { label: '공부', color: colors.primary001 },
    { label: '집안일', color: colors.secondary001 },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null); // 선택된 카테고리 상태

  const handlePress = (category) => {
    setSelectedCategory(category); // 선택된 카테고리를 업데이트
  };

  return (
    <View>
      {/* 제목과 (required mark) */}
      <View style={styles.header}>
        <Text style={styles.requiredMark}>*</Text>
        <Text style={styles.title}>카테고리</Text>
      </View>

      <View style={styles.container}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.categoryButton,
              selectedCategory === category.label && styles.selectedButton, // 선택된 상태 스타일
            ]}
            onPress={() => handlePress(category.label)}
          >
            {/* 원형 색상 표시 */}
            <View
              style={[
                styles.circle,
                { backgroundColor: category.color },
              ]}
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.label && styles.selectedText, // 선택된 텍스트 스타일
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
  requiredMark: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.primary001,
    marginLeft: 4,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 50,
    backgroundColor: colors.white000, // 기본 배경색
  },
  selectedButton: {
    backgroundColor: colors.primary005, // 선택된 버튼의 배경색
    borderColor: colors.primary001, // 선택된 상태에서 테두리 강조
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900, // 기본 텍스트 색상
  },
  selectedText: {
    color: colors.primary001, // 선택된 텍스트의 색상
  },
});

export default TypeButton;
