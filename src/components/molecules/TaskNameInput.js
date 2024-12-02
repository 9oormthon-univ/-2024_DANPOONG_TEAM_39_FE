import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const TaskNameInput = ({ value, onValueChange, placeholder = '일정명' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.requiredMarker}>*</Text>
          <Text style={styles.label}>일정명</Text>
        </View>
        <TextInput
          style={[
            styles.input,
            { color: value ? colors.gray800 : colors.gray400 }, // 값이 없으면 회색 표시
          ]}
          value={value} // 부모의 상태 전달
          onChangeText={onValueChange} // 부모 상태 업데이트
          placeholder={placeholder} // "일정명"으로 설정
          placeholderTextColor={colors.gray400} // 플레이스홀더 색상
          maxLength={50}
        />
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
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
  },
  input: {
    flex: 1,
    textAlign: 'right',
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});

export default TaskNameInput;
