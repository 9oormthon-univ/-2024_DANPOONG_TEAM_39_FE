import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const TaskNameInput = ({ defaultValue = '일정명', onValueChange }) => {
  const [taskName, setTaskName] = useState(defaultValue);

  const handleChangeText = (text) => {
    setTaskName(text);
    onValueChange?.(text); // 입력된 값을 부모 컴포넌트로 전달
  };

  return (
    <View style={styles.container}>
      {/* Label과 Input을 한 줄로 배치 */}
      <View style={styles.rowContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.requiredMarker}>*</Text>
          <Text style={styles.label}>일정명</Text>
        </View>
        <TextInput
          style={[
            styles.input,
            { color: taskName === defaultValue ? colors.gray400 : colors.gray800 }, // 디폴트 값과 입력 여부에 따라 색상 변경
          ]}
          value={taskName}
          onChangeText={handleChangeText}
          onFocus={() => taskName === defaultValue && setTaskName('')} // 포커스 시 디폴트 값 제거
          onBlur={() => taskName.trim() === '' && setTaskName(defaultValue)} // 포커스 해제 시 빈 값이면 디폴트 값으로 설정
          maxLength={50}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //marginBottom: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Label과 Input을 양쪽 정렬
    //paddingVertical: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  requiredMarker: {
    fontSize: 16,
    color: colors.primary001,
    marginRight: 4, // * 기호
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
  },
  input: {
    flex: 1,
    textAlign: 'right', // 텍스트를 오른쪽 정렬
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});

export default TaskNameInput;
