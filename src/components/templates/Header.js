import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import HeaderBell from '../../assets/images/header_bell.svg';
import HeaderMenu from '../../assets/images/header_menu.svg';

const Header = () => {
  return (
    <View style={styles.header}>
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
    justifyContent: 'flex-end',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
});

export default Header;
