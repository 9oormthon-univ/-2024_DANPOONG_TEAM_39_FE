import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderBell from '../../assets/images/header_bell.svg';
import HeaderMenu from '../../assets/images/header_menu.svg';

const Header = () => {
  return (
    <View style={styles.header}>
      {/* 텍스트 아이콘 */}
      <Image
        source={require('../../assets/images/icon_songil_text.png')}
        style={styles.textIcon}
      />

      {/* 오른쪽 아이콘 컨테이너 */}
      <View style={styles.iconContainer}>
        {/* 알림 아이콘 */}
        <TouchableOpacity style={styles.icon}>
          <HeaderBell />
        </TouchableOpacity>

        {/* 메뉴 아이콘 */}
        <TouchableOpacity style={styles.icon}>
          <HeaderMenu />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 16,
    backgroundColor: '#FF7F00',
    alignItems: 'center',
    justifyContent: 'space-between', // 아이콘 간격 균등 배치
  },
  textIcon: {
    position: 'absolute',
    left: 0, // 왼쪽에서 16dp
    width: 100, // 아이콘 너비
    height: 24, // 아이콘 높이
    resizeMode: 'contain', // 아이콘 비율 유지
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto', // 오른쪽으로 밀기
  },
  icon: {
    marginRight: 8,
  },
});

export default Header;
