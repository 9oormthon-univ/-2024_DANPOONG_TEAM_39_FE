import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderBell from '../../assets/images/header_bell.svg';
import HeaderMenu from '../../assets/images/header_menu.svg';

const Header = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/images/icon_songil_text.png')}
        style={styles.textIcon}
      />
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.icon}>
          <HeaderBell />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={onMenuPress}>
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
    justifyContent: 'space-between',
  },
  textIcon: {
    position: 'absolute',
    left: 0,
    width: 100,
    height: 24,
    resizeMode: 'contain',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  icon: {
    marginRight: 8,
  },
});

export default Header;
