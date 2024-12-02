import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const CaregiverSelectionRow = ({
  careAssignments,
  selectedProfile,
  isCaregiverNotNeeded,
  onProfileSelect,
  onToggleCheck,
}) => {
  return (
    <View style={styles.container}>
      {/* 첫 번째 행: 체크박스 */}
      <View style={styles.rowContainer}>
        <View style={styles.labelContainer}>
          <Text style={styles.requiredMarker}>*</Text>
          <Text style={styles.label}>돌보미 선택</Text>
        </View>
        <View style={styles.checkBoxRow}>
          <Text style={styles.checkBoxLabel}>필요하지 않음</Text>
          <TouchableOpacity
            style={[
              styles.checkBox,
              { backgroundColor: isCaregiverNotNeeded ? colors.primary004 : colors.gray200 },
            ]}
            onPress={onToggleCheck}
          >
            {isCaregiverNotNeeded && (
              <Icon name="checkmark" size={16} color={colors.primary001} />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* 두 번째 행: 프로필 목록 */}
      <FlatList
        data={careAssignments}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : `temp-${index}`)} // 안전한 키 생성
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.profileContainer,
              selectedProfile === item.id && styles.selectedProfile, // 선택된 프로필 강조
            ]}
            onPress={() => !isCaregiverNotNeeded && onProfileSelect(item.id)}
            disabled={isCaregiverNotNeeded} // 필요하지 않음 체크 시 비활성화
          >
            <View
              style={[
                styles.profileImageWrapper,
                selectedProfile === item.id && styles.selectedProfileBorder, // 선택된 프로필에 보더 추가
              ]}
            >
              <Image
                source={require('../../assets/images/profile_me.png')} // 기본 프로필 이미지
                style={styles.profileImage}
              />
            </View>
            <Text
              style={[
                styles.profileName,
                isCaregiverNotNeeded && { color: colors.gray400 }, // 필요하지 않음 체크 시 색상 변경
              ]}
            >
              {item.member?.alias || '이름 없음'}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.profileListContainer}
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
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  requiredMarker: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold, 
    color: colors.primary001, 
    marginRight: 4,
  },
  label: { 
    fontSize: 16, 
    fontFamily: fonts.semiBold, 
    color: colors.gray800,
  },
  checkBoxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxLabel: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray800,
    marginRight: 8,
  },
  profileListContainer: {
    paddingHorizontal: 8,
  },
  profileContainer: {
    alignItems: 'center',
    marginRight: 12,
  },
  profileImageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 3,
    borderColor: 'transparent', // 기본 상태에서는 보더 없음
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedProfileBorder: {
    borderColor: colors.primary001, // 선택된 프로필 보더 색상
  },
  profileImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  profileName: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.semiBold,
    textAlign: 'center',
    color: colors.gray800,
  },
  selectedProfile: {
    borderColor: colors.primary001, // 선택된 프로필 보더 색상
  },
});

export default CaregiverSelectionRow;
