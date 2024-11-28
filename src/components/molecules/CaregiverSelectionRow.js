import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons 사용
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import checkIcon from '../../assets/images/check.svg';

const CaregiverSelectionRow = ({ label, initialValue, onValueChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [value, setValue] = useState(initialValue || '없음');

  const handleToggle = () => {
    const newValue = isChecked ? initialValue || '없음' : '없음'; // 체크 여부에 따라 값 설정
    setIsChecked(!isChecked);
    setValue(newValue);
    onValueChange?.(newValue); // 선택 값 변경을 부모 컴포넌트에 전달
  };

  return (
    <View style={styles.container}>
      {/* 사용자 이름 */}
      <View style={styles.rowContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.requiredMarker}>*</Text>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <Text
          style={[
            styles.valueText,
            { color: isChecked ? colors.gray400 : colors.primary001 }, // 체크 상태에 따라 색상 변경
          ]}
        >
          {isChecked ? '없음' : value}
        </Text>
      </View>

      {/* 체크박스 */}
      <View style={[styles.rowContainer, styles.checkboxContainer]}>
        <Text style={styles.checkboxLabel}>돌보미 가족이 필요하지 않음</Text>
        <TouchableOpacity
          style={[
            styles.checkBox,
            { backgroundColor: isChecked ? colors.primary004 : colors.gray200 }, // 체크 상태에 따라 배경색 변경
          ]}
          onPress={handleToggle}
        >
          {isChecked && (
            <Icon name="checkmark" size={20} color={colors.primary001} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requiredMarker: {
    fontSize: 16,
    color: colors.primary001,
    marginRight: 4,
  },
  labelText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
  },
  valueText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
  checkboxContainer: {
    justifyContent: 'flex-end',
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
    marginRight: 8,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.gray200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CaregiverSelectionRow;
