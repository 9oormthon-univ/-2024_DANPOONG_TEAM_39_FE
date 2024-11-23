import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // 체크박스 아이콘
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import PencilLineIcon from '../../assets/images/pencil_line.svg'; // 기본 아이콘
import CheckedPencilLineIcon from '../../assets/images/checked_pencil_line.svg'; // 체크된 상태의 아이콘

const TaskPlace = ({ label = '장소' }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [place, setPlace] = useState(''); // 텍스트 필드 상태

  const handleToggle = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setPlace('자택'); // 체크 시 "자택"으로 고정
    } else {
      setPlace(''); // 체크 해제 시 텍스트 필드 초기화
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* 라벨 텍스트 */}
        <Text style={styles.label}>{label}</Text>

        {/* 체크박스와 텍스트 */}
        <View style={styles.checkboxContainer}>
          <Text style={styles.text}>{isChecked ? '자택' : '자택'}</Text>
          <TouchableOpacity
            style={[
              styles.checkBox,
              { backgroundColor: isChecked ? colors.primary004 : colors.gray200 },
            ]}
            onPress={handleToggle}
          >
            {isChecked && (
              <Icon name="checkmark" size={16} color={colors.primary001} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* 텍스트 입력 필드 */}
      <View style={styles.inputRow}>
        <TextInput
          style={[
            styles.field,
            { color: isChecked ? colors.gray400 : colors.gray800 }, // 비활성화 상태일 때 색상 변경
          ]}
          placeholder="장소 입력"
          placeholderTextColor={colors.gray400}
          value={place} // 텍스트 필드 값
          onChangeText={setPlace} // 값 변경 핸들러
          editable={!isChecked} // 체크 시 비활성화
        />
        {/* 아이콘 변경 */}
        {isChecked ? (
          <CheckedPencilLineIcon width={20} height={20} />
        ) : (
          <PencilLineIcon width={20} height={20} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
    marginRight: 8,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // 아이콘과 입력 필드 간격 조정
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFF', // 배경 흰색
  },
  field: {
    flex: 1, // 입력 필드가 가능한 공간을 채움
    fontSize: 16,
    fontFamily: fonts.semiBold,
  },
});

export default TaskPlace;
