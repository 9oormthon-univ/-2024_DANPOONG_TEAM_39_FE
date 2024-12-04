import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GnbPlusIcon from '../../assets/images/gnb_plus.svg'; // 플러스 아이콘
import colors from '../../styles/colors';

const FloatingButton1 = (categoryName, time, endTime, date) => {
    const navigation = useNavigation();

    // 버튼 클릭 시 AddOthersTask로 이동하며 값 넘기기
    const handleButtonPress = () => {
        navigation.navigate('AddOthersTask', {
            categoryName: categoryName,
            date: date,
            time: time,
            endTime: endTime,
        });
    };


    return (
        <View style={styles.container}>
            {/* 플로팅 버튼 클릭 시 바로 기타 폼으로 이동 */}
            <TouchableOpacity style={styles.floatingButton} onPress={handleButtonPress}>
                <GnbPlusIcon width={24} height={24} fill={colors.primary001} />
            </TouchableOpacity>
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
    // menuText: {
    //     marginTop: 0,
    //     fontSize: 12,
    //     color: '#333',
    //     textAlign: 'center',
    //     fontFamily: fonts.semiBold,
    // },
    iconWithText: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    // floatingButtonText: {
    //     fontSize: 12,
    //     fontFamily: fonts.semiBold,
    //     color: '#FFF',
    // },
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


export default FloatingButton1;
