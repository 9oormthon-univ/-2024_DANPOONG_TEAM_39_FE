import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles'; // 폰트 스타일 가져오기
import CloseIcon from '../../assets/images/modal_close.svg'; // 닫기 아이콘

const InviteCaregiverModal = ({ visible, onClose, calendarId }) => {




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
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <CloseIcon width={24} height={24} />
            </TouchableOpacity>
          </View>

          {/* 중앙 섹션 */}
          <View style={styles.contentSection}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>
                이미 가족 계정이 있으신가요?{"\n"}공유받는
                <Text style={styles.highlightText}> 6자리 초대 코드</Text>
                를 입력하고{"\n"}
                돌봄 일정을 가족과 함께 관리해보세요!
              </Text>
            </View>

            {/* 초대 코드 컴포넌트 */}
            <View style={styles.codeContainer}>
             
            </View>
          </View>

          {/* 하단 버튼 */}
          <TouchableOpacity style={styles.bottomSection}>
            <Text style={styles.contactText}>카카오톡으로 공유하기</Text>
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
    textAlign: 'center',
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
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  codeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray100,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'center',
  },
  codeText: {
    flex: 1,
    ...textStyles.title16SemiBold,
    color: colors.gray900,
    textAlign: 'center',
  },
  copyButton: {
    marginLeft: 8,
    backgroundColor: colors.primary001,
    padding: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    height: 52,
    backgroundColor: colors.primary001,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactText: {
    ...textStyles.title16SemiBold,
    color: colors.white000,
  },
});

export default InviteCaregiverModal;
