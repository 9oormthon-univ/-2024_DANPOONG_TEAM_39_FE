import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Image, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Feather 라이브러리 사용
import HandHeartIcon from '../../assets/images/hand_heart.svg';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import InviteCaregiverModal from './InviteCaregiverModal'; // 초대 모달 컴포넌트 가져오기
import textStyles from '../../styles/textStyles';

const FamilyList = ({ onSelectProfile }) => {
  const [profiles, setProfiles] = useState([
    { id: 0, name: '할머니', imagePath: require('../../assets/images/profile.png') },
  ]); // 초기 프로필
  const [selectedProfile, setSelectedProfile] = useState(null); // 선택된 프로필 상태
  const [isInviteModalVisible, setInviteModalVisible] = useState(false); // 모달 상태 관리

  // API에서 프로필 데이터 가져오기
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://34.236.139.89:8080/api/careCalendar/dolbomiList');
        const data = await response.json();

        // 기존 프로필에 API 데이터를 추가
        const newProfiles = data.map((profile) => ({
          id: profile.id,
          name: profile.member.alias || 'Unknown',
          imagePath: require('../../assets/images/profile_me.png'), // 고정 이미지 경로
        }));

        setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile.id); // 선택된 프로필 상태 업데이트
    onSelectProfile(profile); // 선택된 프로필 전달
  };

  const handleInvite = () => {
    setInviteModalVisible(true); // 초대 모달 열기
  };

  const closeInviteModal = () => {
    setInviteModalVisible(false); // 초대 모달 닫기
  };

  if (!profiles || profiles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>프로필 정보가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 첫 번째 프로필을 고정 */}
      <TouchableOpacity
        style={[
          styles.profileButton,
          selectedProfile === profiles[0].id && styles.selectedProfile, // 선택된 프로필 스타일 적용
        ]}
        onPress={() => handleProfileSelect(profiles[0])} // 첫 번째 프로필 클릭
      >
        <View
          style={[
            styles.imageWrapper,
            selectedProfile === profiles[0].id && styles.selectedImageWrapper,
          ]}
        >
          <Image source={profiles[0].imagePath} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.text}>{profiles[0].name}</Text>
          <HandHeartIcon style={styles.icon} />
        </View>
      </TouchableOpacity>

      {/* 나머지 프로필들은 가로 스크롤 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {profiles.slice(1).map((profile) => (
          <TouchableOpacity
            key={profile.id}
            style={[
              styles.profileButton,
              selectedProfile === profile.id && styles.selectedProfile, // 선택된 프로필 스타일 적용
            ]}
            onPress={() => handleProfileSelect(profile)} // 나머지 프로필 클릭
          >
            <View
              style={[
                styles.imageWrapper,
                selectedProfile === profile.id && styles.selectedImageWrapper,
              ]}
            >
              <Image source={profile.imagePath} style={styles.image} />
            </View>
            <Text style={styles.text}>{profile.name}</Text>
          </TouchableOpacity>
        ))}

        {/* 마지막에 + 버튼 추가 */}
        <TouchableOpacity style={styles.inviteButton} onPress={handleInvite}>
          <View style={styles.addButton}>
            <Icon name="plus" size={32} color={colors.primary001} />
          </View>
          <Text style={styles.inviteText}>가족 초대</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* 초대 모달 */}
      <Modal visible={isInviteModalVisible} transparent={true} animationType="slide">
        <InviteCaregiverModal onClose={closeInviteModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7F00',
  },
  scrollContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    alignItems: 'center',
    justifyContent: 'center', // 수직 가운데 정렬
    marginHorizontal: 10,
  },
  inviteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  addButton: {
    width: 58,
    height: 58,
    borderRadius: 29, // 원형 버튼
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary004, // 원형 버튼 색상
  },
  inviteText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    ...textStyles.title14Bold,
    fontFamily: fonts.semiBold,
    color: colors.white000, // 텍스트 색상
    textAlign: 'center',
  },
  imageWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedImageWrapper: {
    borderWidth: 4, // 선택된 프로필의 보더 두께
    borderColor: colors.white000, // 선택된 프로필의 보더 색상
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  textContainer: {
    flexDirection: 'row', // 텍스트와 아이콘을 가로로 배치
    alignItems: 'center', // 수직 가운데 정렬
  },
  text: {
    marginTop: 5,
    fontFamily: fonts.semiBold,
    textAlignVertical: 'center', // 텍스트의 수직 정렬
    fontSize: 14,
    color: colors.white000,
  },
  icon: {
    marginLeft: 2,
    textAlignVertical: 'center', // 텍스트의 수직 정렬
  },
  selectedProfile: {
    borderRadius: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary001,
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#FF7F00',
  },
});

export default FamilyList;
