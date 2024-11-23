import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const MedicationTypeButton = ({ onAddType, onDeleteType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newType, setNewType] = useState('');
  const [medicationTypes, setMedicationTypes] = useState([]);
  const [longPressedType, setLongPressedType] = useState(null);

  const handleAddType = () => {
    if (newType.trim()) {
      setMedicationTypes((prev) => [...prev, newType.trim()]);
      setNewType('');
      setIsEditing(false);
      onAddType?.(newType.trim()); // Optional callback
    }
  };

  const handleDeleteType = (type) => {
    setMedicationTypes((prev) => prev.filter((t) => t !== type));
    setLongPressedType(null);
    onDeleteType?.(type); // Optional callback
  };

  const handleLongPress = (type) => {
    setLongPressedType(type);
  };

  return (
    <View style={styles.container}>
      <View style={styles.typeList}>
        {/* 추가 버튼 */}
        {!isEditing && (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.addButtonText}>복약 종류 추가</Text>
            <Icon name="add" size={21} color={colors.black000} />
          </TouchableOpacity>
        )}

        {/* 텍스트 입력 */}
        {isEditing && (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputLarge} // 스타일 이름 사용
              placeholder="복약 종류 입력"
              value={newType}
              onChangeText={setNewType}
              onSubmitEditing={handleAddType}
              placeholderTextColor={colors.gray300}
            />
            <TouchableOpacity onPress={handleAddType}>
              <Icon name="checkmark-circle" size={22} color={colors.primary001} />
            </TouchableOpacity>
          </View>
        )}

        {/* 복약 종류 목록 */}
        {medicationTypes.map((type, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.typeButton,
              longPressedType === type && styles.deleteMode,
            ]}
            onPress={() => {
              if (longPressedType === type) {
                setLongPressedType(null);
              }
            }}
            onLongPress={() => handleLongPress(type)}
          >
            <Text
              style={[
                styles.typeText,
                longPressedType === type && styles.deleteText,
              ]}
            >
              {type}
            </Text>
            {longPressedType === type && (
              <TouchableOpacity onPress={() => handleDeleteType(type)}>
                <Icon
  
                  name="trash-outline"
                  size={20}
                  color={colors.primary001}
                  style={{ marginLeft: 4}}
                />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 50,
    backgroundColor: colors.white000,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
    marginRight: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.gray050,
  },
  inputSmall: {
    //width: 100,
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
  inputLarge: {
    //width: 200, // 이 부분을 조정하여 크기 변경
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
    marginRight: 4,
  },
  typeList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8, // 버튼 간 간격
    alignItems: 'center',
  },
  typeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  deleteMode: {
    borderColor: colors.primary001,
    backgroundColor: colors.primary005,
  },
  typeText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
  deleteText: {
    color: colors.primary001,
  },
});

export default MedicationTypeButton;
