import React, { useState, useEffect } from 'react';
import { ScrollView, View, TouchableOpacity, Text, Image, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import HandHeartIcon from '../../assets/images/hand_heart.svg';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import InviteCaregiverModal from './InviteCaregiverModal';
import textStyles from '../../styles/textStyles';

const FamilyList = ({ onSelectProfile }) => {
  const [profiles, setProfiles] = useState([
    { id: 0, name: '할머니', imagePath: require('../../assets/images/profile.png') },
  ]);
  const [selectedProfile, setSelectedProfile] = useState(0); // 초기값을 '할머니'의 id로 설정
  const [isInviteModalVisible, setInviteModalVisible] = useState(false);

  // API에서 프로필 데이터 가져오기
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://34.236.139.89:8080/api/careCalendar/dolbomiList');
        const data = await response.json();

        // API 데이터를 기반으로 프로필 생성
        const newProfiles = data.map((profile) => ({
          id: profile.id,
          name: profile.member.alias || 'Unknown',
          imagePath: require('../../assets/images/profile_me.png'),
        }));

        // 기존 프로필과 병합하되, 중복 제거
        setProfiles((prevProfiles) => {
          const allProfiles = [...prevProfiles, ...newProfiles];
          const uniqueProfiles = allProfiles.filter(
            (profile, index, self) =>
              index === self.findIndex((p) => p.id === profile.id) // 중복 제거
          );
          return uniqueProfiles;
        });
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };
  
    fetchProfiles();
  }, []);
  

  // 앱 실행 시 기본 프로필 선택
  useEffect(() => {
    const initialProfile = profiles.find((profile) => profile.id === selectedProfile);
    if (initialProfile) {
      onSelectProfile(initialProfile);
    }
  }, [profiles]); // profiles가 업데이트될 때 실행

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile.id);
    onSelectProfile(profile);
  };

  const handleInvite = () => {
    setInviteModalVisible(true);
  };

  const closeInviteModal = () => {
    setInviteModalVisible(false);
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
      {/* 첫 번째 프로필 고정 */}
      <TouchableOpacity
        style={[
          styles.profileButton,
          selectedProfile === profiles[0].id && styles.selectedProfile,
        ]}
        onPress={() => handleProfileSelect(profiles[0])}
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

      {/* 나머지 프로필은 가로 스크롤 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {profiles.slice(1).map((profile) => (
          <TouchableOpacity
            key={profile.id} // id를 고유 key로 사용
            style={[
              styles.profileButton,
              selectedProfile === profile.id && styles.selectedProfile,
            ]}
            onPress={() => handleProfileSelect(profile)}
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

        {/* + 버튼 */}
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
    justifyContent: 'center',
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
    borderRadius: 29,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary004,
  },
  inviteText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    ...textStyles.title14Bold,
    fontFamily: fonts.semiBold,
    color: colors.white000,
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
    borderWidth: 4,
    borderColor: colors.white000,
  },
  image: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginTop: 5,
    fontFamily: fonts.semiBold,
    textAlignVertical: 'center',
    fontSize: 14,
    color: colors.white000,
  },
  icon: {
    marginLeft: 2,
    textAlignVertical: 'center',
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
