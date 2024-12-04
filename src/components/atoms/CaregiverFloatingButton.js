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
import AddCaregiverRestTask from "../../screens/AddCaregiverRestTask";

const CaregiverFloatingButton = ({ date, time, endTime }) => {
    const [isMenuVisible, setMenuVisible] = useState(false); // 메뉴 상태
    const animationValue = useRef(new Animated.Value(0)).current; // 애니메이션 값 관리
    const navigation = useNavigation();
    const buttonPosition = useRef({ bottom: 20, right: 20 }).current; // 플로팅 버튼 위치

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
        }).start(() => setMenuVisible(false));
    };

    // 카테고리별 네비게이션
    const categoryScreens = {
        meal: 'AddCaregiverMealTask',
        hospital: 'AddCaregiverHospitalTask',
        medication: 'AddCaregiverPillTask',
        rest: 'AddCaregiverRestTask', // rest 카테고리 수정
        others: 'AddCaregiverOthersTask',
    };

    const handleCategoryPress = (category) => {
        // 메뉴 닫기
        closeMenu();

        // 카테고리 화면 이름 가져오기
        const screenName = categoryScreens[category];

        // 콘솔로 값 확인
        console.log('Selected Category:', category);
        console.log('Screen Name:', screenName);
        console.log('Date:', date);
        console.log('Time:', time);
        console.log('endTime:', endTime);

        navigation.navigate(screenName, {
            selectedCategory: category,
            apDate: date,
            apStartTime: time,
            apEndTime: endTime,
        });
    };



    // 내 일정 추가 네비게이션
    const handleMyCalendarNavigation = () => {
        closeMenu();
        navigation.navigate('AddMyCalendar');
    };

    return (
        <View
            style={styles.container}
            onLayout={() => {
                buttonPosition.bottom = 20;
                buttonPosition.right = 20;
            }}
        >
            {/* 모달 */}
            {isMenuVisible && (
                <Modal transparent visible animationType="fade">
                    {/* 모달 배경 */}
                    <TouchableOpacity style={styles.overlay} onPress={closeMenu} />

                    {/* 드롭다운 메뉴 */}
                    <View
                        style={[styles.modalContent, { bottom: buttonPosition.bottom, right: buttonPosition.right }]}
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
                            {/* 카테고리 목록 */}
                            {Object.entries(categoryScreens).map(([key, screen]) => (
                                <TouchableOpacity
                                    key={key}
                                    style={styles.menuItem}
                                    onPress={() => handleCategoryPress(key)}
                                >
                                    {key === 'meal' && <CategoryMealIcon width={24} height={24} />}
                                    {key === 'hospital' && <CategoryHospitalIcon width={24} height={24} />}
                                    {key === 'medication' && <CategoryPillIcon width={24} height={24} />}
                                    {key === 'rest' && <CategoryRestIcon width={24} height={24} />}
                                    {key === 'others' && <CategoryCheckIcon width={24} height={24} />}
                                    <Text style={styles.menuText}>
                                        {key === 'meal'
                                            ? '식사'
                                            : key === 'hospital'
                                                ? '병원'
                                                : key === 'medication'
                                                    ? '복약'
                                                    : key === 'rest'
                                                        ? '휴식'
                                                        : '기타'}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>

                        {/* 플로팅 버튼 */}
                        <TouchableOpacity
                            style={styles.floatingButton}
                            onPress={isMenuVisible ? handleMyCalendarNavigation : openMenu}
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

            {/* 플로팅 버튼 */}
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

export default CaregiverFloatingButton;
