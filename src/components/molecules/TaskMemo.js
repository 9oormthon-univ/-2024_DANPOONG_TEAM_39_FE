import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import PencilLineIcon from '../../assets/images/pencil_line.svg'; // 기본 아이콘

const TaskMemo = ({ label = '메모', placeholder = '메모 추가하기' }) => {
  const [memo, setMemo] = useState(''); // 메모 상태

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* 라벨 */}
        <Text style={styles.label}>{label}</Text>
      </View>

      {/* 텍스트 입력 필드 */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.field}
          placeholder={placeholder}
          placeholderTextColor={colors.gray400}
          value={memo} // 텍스트 필드 값
          onChangeText={setMemo} // 값 변경 핸들러
        />
        <PencilLineIcon width={20} height={20} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 아이콘과 입력 필드 간격 조정
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFF', // 배경 흰색
  },
  field: {
    flex: 1, // 입력 필드가 가능한 공간을 채움
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
  },
});

export default TaskMemo;