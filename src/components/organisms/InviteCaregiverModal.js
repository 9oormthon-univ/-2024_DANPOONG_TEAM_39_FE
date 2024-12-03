import React, { useState, useEffect } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles'; // 폰트 스타일 가져오기
import CloseIcon from '../../assets/images/modal_close.svg'; // 닫기 아이콘
import CopyIcon from '../../assets/images/copy.svg'; // 복사 아이콘
import axios from 'axios';
import useSessionStore from '../../stores/sessionStore'; // Zustand 저장소 가져오기

const InviteCaregiverModal = ({ visible, onClose, calendarId }) => {
  const [inviteCode, setInviteCode] = useState(null); // 초대 코드 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  //const token = useSessionStore((state) => state.token); // Zustand에서 토큰 가져오기
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaG9peW91bmdpbjA5MDJAZ21haWwuY29tIiwiaWF0IjoxNzMzMTU1NzA3LCJleHAiOjE3MzMxNTkzMDd9.v7WYvsQpA2kSyWW-1EmqNZrGrUoFUflxJDIYY2qI1Fs';
  // 서버에서 초대 코드를 가져오는 함수
  const fetchInviteCode = async () => {
    if (!token) {
      Alert.alert('오류', '로그인이 필요합니다.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post(
        `http://34.236.139.89:8080/api/invitation`,
        {
          recipientId: 1, // 요청 바디에 필요한 값
          assignmentId: 1, // 요청 바디에 필요한 값
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 헤더에 포함
            'Content-Type': 'application/json', // 요청 헤더에 JSON 형식 명시
          },
        }
      );
      console.log('Response data:', response.data); // 응답 데이터 확인
      setInviteCode(response.data.code); // 초대 코드 저장
    } catch (err) {
      console.error('Error fetching invite code:', err.response?.data || err.message);
      setError('초대 코드를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // 초대 코드를 클립보드에 복사하는 함수
  const copyToClipboard = () => {
    if (inviteCode) {
      Clipboard.setString(inviteCode);
      Alert.alert('복사 완료', '초대 코드가 클립보드에 복사되었습니다.');
    } else {
      Alert.alert('복사 실패', '초대 코드가 없습니다.');
    }
  };

  // 컴포넌트가 열릴 때 초대 코드를 가져옴
  useEffect(() => {
    if (visible && calendarId) {
      fetchInviteCode();
    }
  }, [visible, calendarId]);

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
                우리 가족이 생성되었어요.{"\n"}
                <Text style={styles.highlightText}> 할머니</Text>
                를 함께 돌볼 가족을 추가하면
                공동으로 돌봄 일정을 관리할 수 있어요!
              </Text>
            </View>

            {/* 초대 코드 컴포넌트 */}
            <View style={styles.codeContainer}>
              {loading ? (
                <ActivityIndicator size="large" color={colors.primary001} />
              ) : (
                <>
                  <Text style={styles.codeText}>
                    {inviteCode || '초대 코드를 생성 중입니다.'}
                  </Text>
                  <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                    <CopyIcon width={24} height={24} />
                  </TouchableOpacity>
                </>
              )}
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
