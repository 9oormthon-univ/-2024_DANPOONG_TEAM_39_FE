import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';
import CloseIcon from '../../assets/images/modal_close.svg';
import CopyIcon from '../../assets/images/copy.svg';

const InviteCaregiverModal = ({ visible, onClose }) => {
  const inviteCode = 'SONGIL'; // 고정된 초대 코드

  // 초대 코드를 클립보드에 복사하는 함수
  const copyToClipboard = () => {
    Clipboard.setString(inviteCode);
    Alert.alert('복사 완료', '초대 코드가 클립보드에 복사되었습니다.');
  };

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

          {/* 중앙 텍스트 섹션 */}
          <View style={styles.contentSection}>
            <View style={styles.textContainer}>
              <Text style={styles.titleText}>
                우리 가족이 생성되었어요.{"\n"}
                <Text style={styles.highlightText}> 할머니</Text>
                를 함께 돌볼 가족을 추가하면
                공동으로 돌봄 일정을 관리할 수 있어요!
              </Text>
            </View>

            {/* 초대 코드 섹션 */}
            <View style={styles.codeContainer}>
              <Text style={styles.codeText}>{inviteCode}</Text>
              <TouchableOpacity style={styles.copyIconButton} onPress={copyToClipboard}>
                <CopyIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
          </View>

          {/* 하단 버튼 섹션 */}
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
    overflow: 'hidden',
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
    backgroundColor: colors.white000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white000,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: 8,
    justifyContent: 'space-between',
    width: '100%',
    height: 48,
    marginBottom: 16,
  },
  codeText: {
    flex: 1,
    ...textStyles.title16SemiBold,
    color: colors.gray400,
    textAlign: 'left',
    marginHorizontal: 16,
  },
  copyIconButton: {
    padding: 14,
    backgroundColor: colors.primary001,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
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
