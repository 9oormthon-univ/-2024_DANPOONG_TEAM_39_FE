import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation 훅 가져오기
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';
import CloseIcon from '../../assets/images/modal_close.svg';

const EnterCaregiverModal = ({ visible, onClose }) => {
  const [inviteCode, setInviteCode] = useState(''); // 초대 코드 상태 관리
  const navigation = useNavigation(); // 네비게이션 객체 가져오기

  const handleConfirm = () => {
    if (inviteCode.length === 6) {
      // 초대 코드가 6자리일 때만 동작
      onClose(); // 모달 닫기
      navigation.navigate('HomeScreen'); // 홈 화면으로 이동
    } else {
      // Alert 제거: 잘못된 입력 시 아무 동작도 하지 않음
      console.log('초대 코드는 6자리여야 합니다.');
    }
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

            {/* 초대 코드 입력 박스 */}
            <TextInput
              style={styles.inputBox}
              placeholder="초대 코드 입력(6자리)"
              placeholderTextColor={colors.gray400}
              value={inviteCode}
              onChangeText={setInviteCode}
              maxLength={6}
              keyboardType="number-pad"
            />
          </View>

          {/* 하단 버튼 */}
          <TouchableOpacity style={styles.bottomSection} onPress={handleConfirm}>
            <Text style={styles.contactText}>확인</Text>
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
    backgroundColor: colors.gray050,
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
    backgroundColor: colors.gray050,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 20,
  },
  inputBox: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray200,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: colors.white000,
    ...textStyles.title16SemiBold,
    color: colors.gray900,
    fontSize: 16,
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

export default EnterCaregiverModal;
