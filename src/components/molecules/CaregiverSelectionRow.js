import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Ionicons 사용
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import profiles from '../../datas/Profiles'; // Profiles 데이터 임포트

const CaregiverSelectionRow = ({ label, onValueChange }) => {
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태
  const [selectedProfile, setSelectedProfile] = useState(null); // 선택된 프로필

  const handleToggle = () => {
    setIsChecked(!isChecked);
    setSelectedProfile(null); // 체크박스 활성화 시 선택된 프로필 초기화
    const newValue = !isChecked ? '없음' : '필요';
    onValueChange?.(newValue);
  };

  const handleProfileSelect = (profileId) => {
    if (isChecked) return; // 체크박스 활성화 시 프로필 선택 불가
    setSelectedProfile(profileId);
  };

  return (
    <View style={styles.container}>
      {/* 첫 번째 행: Label과 체크박스 */}
      <View style={styles.rowContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.requiredMarker}>*</Text>
          <Text style={styles.labelText}>{label}</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={styles.checkboxLabel}>필요하지 않음</Text>
          <TouchableOpacity
            style={[
              styles.checkBox,
              { backgroundColor: isChecked ? colors.primary004 : colors.gray200 },
            ]}
            onPress={handleToggle}
          >
            {isChecked && (
              <Icon name="checkmark" size={20} color={colors.primary001} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* 두 번째 행: FamilyProfile 리스트 */}
      <FlatList
        data={profiles.slice(1)} // 첫 번째 프로필 제외
        keyExtractor={(item) => item.id.toString()} // 고유 키 설정
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.profileContainer}
            onPress={() => handleProfileSelect(item.id)}
          >
            <View
              style={[
                styles.profileImageWrapper,
                selectedProfile === item.id && !isChecked && styles.selectedProfile, // 선택된 프로필 보더
              ]}
            >
              <Image source={item.imagePath} style={styles.profileImage} />
            </View>
            <Text
              style={[
                styles.profileName,
                isChecked
                  ? { color: colors.gray400 } // 체크박스가 활성화된 경우
                  : selectedProfile === item.id
                  ? { color: colors.primary001 } // 선택된 프로필
                  : { color: colors.gray800 }, // 기본 상태
              ]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.profileListContainer} // FlatList 스타일
      />
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  profileListContainer: {
    paddingHorizontal: 8,
  },
  profileContainer: {
    alignItems: 'center',
    marginRight: 12, // 프로필 간격 설정
  },
  profileImageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'transparent', // 기본 상태에서는 보더 없음
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8, // 이미지와 이름 간격
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  profileName: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.semiBold, // 세미볼드체 사용
    textAlign: 'center',
  },
  selectedProfile: {
    borderColor: colors.primary001, // 선택된 프로필 보더 색상
  },
});

export default CaregiverSelectionRow;
