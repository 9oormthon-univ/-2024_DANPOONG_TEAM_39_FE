import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.iconContainer}>
        {/* 알림 아이콘 */}
        <TouchableOpacity style={styles.icon}>
          <Icon name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>

        {/* 메뉴 아이콘 */}
        <TouchableOpacity style={styles.icon}>
          <Icon name="menu" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // width: 360,
    // height: 56,
    flexDirection: 'row',
    paddingHorizontal: 10,  // 좌우 여백을 20px로 설정
    paddingVertical: 16,    // 상하 여백을 16px로 설정
    backgroundColor: '#FF7F00', // 배경색 추가 (아이콘이 하얀색이라 배경색이 필요)
    alignItems: 'center',   // 자식 요소를 수직 가운데 정렬
    justifyContent: 'flex-end', // 아이콘들이 오른쪽 끝으로 정렬되도록 설정
  },
  iconContainer: {
    flexDirection: 'row',   // 아이콘을 가로로 나열
    alignItems: 'center',   // 아이콘을 수직 가운데 정렬
  },
  icon: {
    marginRight: 8,         // 아이콘 간 간격을 8px로 설정
  },
});

export default Header;
