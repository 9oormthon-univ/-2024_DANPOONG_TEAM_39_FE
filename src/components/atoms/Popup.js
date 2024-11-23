import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles'; // 폰트 스타일 가져오기
import CloseIcon from '../../assets/images/modal_close.svg'; // 닫기 아이콘
import PhoneIcon from '../../assets/images/modal_phone.svg'; // 전화 아이콘
import LocationIcon from '../../assets/images/daily_map.svg'; // 위치 아이콘

const Popup = ({ visible, onClose }) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          {/* 상단 섹션 */}
          <View style={styles.topSection}>
            <Text style={styles.titleText}>
              집 근처 <Text style={styles.highlightText}>데이케어센터</Text>를 추천할게요
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <CloseIcon width={24} height={24} />
            </TouchableOpacity>
          </View>

          {/* 중앙 섹션 */}
          <View style={styles.contentSection}>
            <View style={styles.textContainer}>
              <Text style={styles.centerTitle}>송파행복데이케어센터</Text>
              <Text style={styles.detailText}>자세히 보기</Text>
              <View style={styles.locationContainer}>
                <LocationIcon width={16} height={16} />
                <Text style={styles.locationText}>자택으로부터 000m</Text>
              </View>
            </View>
            <Image
              source={require('../../assets/images/img_onboarding.png')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* 하단 버튼 */}
          <TouchableOpacity style={styles.bottomSection}>
            <PhoneIcon width={20} height={20} style={styles.phoneIcon} />
            <Text style={styles.contactText}>전화로 문의하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 328,
    borderRadius: 12,
    overflow: 'hidden', // 둥근 모서리
    backgroundColor: colors.gray050,
  },
  topSection: {
    height: 64,
    backgroundColor: colors.white000,
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  titleText: {
    ...textStyles.title16SemiBold,
    color: colors.gray900,
  },
  highlightText: {
    color: colors.primary001,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  contentSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white000,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  centerTitle: {
    ...textStyles.title16SemiBold,
    color: colors.gray900,
    marginBottom: 8,
  },
  detailText: {
    ...textStyles.subtitle12Medium14,
    color: colors.primary001,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...textStyles.caption11Medium,
    color: colors.gray900,
    marginLeft: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginLeft: 16,
  },
  bottomSection: {
    height: 52,
    backgroundColor: colors.primary001,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  phoneIcon: {
    marginRight: 8,
  },
  contactText: {
    ...textStyles.title16SemiBold,
    color: colors.white000,
  },
});

export default Popup;
