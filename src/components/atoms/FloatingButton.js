import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GnbPlusIcon from '../../assets/images/gnb_plus.svg'; // 플러스 아이콘
import GnbPencilIcon from '../../assets/images/gnb_pencil.svg'; // 연필 아이콘
import CategoryMealIcon from '../../assets/images/category_meal.svg'; // 식사 아이콘
import CategoryHospitalIcon from '../../assets/images/category_hospital.svg'; // 병원 아이콘
import CategoryPillIcon from '../../assets/images/category_pill.svg'; // 복약 아이콘
import CategoryRestIcon from '../../assets/images/category_rest.svg'; // 휴식 아이콘
import CategoryCheckIcon from '../../assets/images/category_check.svg'; // 기타 아이콘
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const FloatingButton = () => {
  const [isMenuVisible, setMenuVisible] = useState(false); // 메뉴 상태
  const animationValue = useState(new Animated.Value(0))[0]; // 애니메이션 값 관리
  const navigation = useNavigation();
  const buttonPosition = useRef({ bottom: 20, right: 20 }).current; // 플로팅 버튼의 위치

  // 메뉴 열기 애니메이션
  const openMenu = () => {
    setMenuVisible(true);
    Animated.timing(animationValue, {
      toValue: 1, // 열림 상태
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // 메뉴 닫기 애니메이션
  const closeMenu = () => {
    Animated.timing(animationValue, {
      toValue: 0, // 닫힘 상태
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false)); // 애니메이션 완료 후 상태 변경
  };

  // 카테고리 클릭 핸들러
  const handleCategoryPress = (category) => {
    closeMenu();
    navigation.navigate('AddTask', { category }); // 네비게이션 전달
  };

  // 연필 캘린더 아이콘 클릭 시 네비게이션
  const handlePencilNavigation = () => {
    if (isMenuVisible) {
      navigation.navigate('MyTasks'); // 원하는 화면으로 이동
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={(event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        buttonPosition.bottom = 20;
        buttonPosition.right = 20;
      }}
    >
      {/* 모달 */}
      {isMenuVisible && (
        <Modal transparent={true} visible={isMenuVisible} animationType="fade">
          {/* 모달 배경 */}
          <TouchableOpacity style={styles.overlay} onPress={closeMenu}>
            {/* 빈 터치 영역으로 닫기 */}
          </TouchableOpacity>

          {/* 드롭다운 메뉴와 플로팅 버튼 */}
          <View
            style={[
              styles.modalContent,
              {
                bottom: buttonPosition.bottom, // 플로팅 버튼 위치를 기준으로 모달 정렬
                right: buttonPosition.right,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.menuContainer,
                {
                  transform: [
                    {
                      translateY: animationValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: [5, 0],
                      }),
                    },
                  ],
                  opacity: animationValue,
                },
              ]}
            >
              {/* 카테고리 */}
              <TouchableOpacity style={styles.menuItem} onPress={() => handleCategoryPress('식사')}>
                <CategoryMealIcon width={24} height={24} />
                <Text style={styles.menuText}>식사</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleCategoryPress('병원')}>
                <CategoryHospitalIcon width={24} height={24} />
                <Text style={styles.menuText}>병원</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleCategoryPress('복약')}>
                <CategoryPillIcon width={24} height={24} />
                <Text style={styles.menuText}>복약</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleCategoryPress('휴식')}>
                <CategoryRestIcon width={24} height={24} />
                <Text style={styles.menuText}>휴식</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={() => handleCategoryPress('기타')}>
                <CategoryCheckIcon width={24} height={24} />
                <Text style={styles.menuText}>기타</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* 플로팅 버튼 */}
            <TouchableOpacity
              style={styles.floatingButton}
              onPress={isMenuVisible ? handlePencilNavigation : openMenu}
            >
              {isMenuVisible ? (
                <View style={styles.iconWithText}>
                  <GnbPencilIcon width={24} height={24} fill={colors.primary001} />
                  <Text style={styles.floatingButtonText}>내 일정</Text>
                </View>
              ) : (
                <GnbPlusIcon width={24} height={24} fill={colors.primary001} />
              )}
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* 플로팅 버튼 (모달 외부에서 항상 존재) */}
      {!isMenuVisible && (
        <TouchableOpacity style={styles.floatingButton} onPress={openMenu}>
          <GnbPlusIcon width={24} height={24} fill={colors.primary001} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.66)', // 반투명 배경
  },
  modalContent: {
    position: 'absolute',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  menuContainer: {
    width: 60,
    height: 340,
    backgroundColor: '#FFF',
    borderRadius: 28,
    overflow: 'hidden',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 6,
    bottom: -40,
  },
  menuItem: {
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 4,
    width: '100%',
  },
  menuText: {
    marginTop: 0,
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    fontFamily: fonts.semiBold,
  },
  iconWithText: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  floatingButtonText: {
    fontSize: 12,
    fontFamily: fonts.semiBold,
    color: '#FFF',
  },
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF7F00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default FloatingButton;
