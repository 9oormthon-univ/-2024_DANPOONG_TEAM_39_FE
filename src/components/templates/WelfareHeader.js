import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Search from '../../assets/images/lucide_search.svg';
import Feather from 'react-native-vector-icons/Feather';
import textStyles from '../../styles/textStyles';
import colors from '../../styles/colors';
import { useNavigation, useRoute } from '@react-navigation/native'; // useNavigation과 useRoute 가져오기

const WelfareHeader = () => {
  const navigation = useNavigation(); // Navigation 객체
  const route = useRoute(); // 현재 라우트 확인

  // 동적으로 텍스트 설정
  const isSearchScreen = route.name === 'WelfareSearch'; // 현재 화면이 WelfareSearch인지 확인
  const title = isSearchScreen ? '복지서비스 검색' : '복지서비스 찾기'; // 화면에 따른 타이틀

  return (
    <View style={styles.topBarContainer}>
      <View style={styles.topBarContents}>
        <View style={styles.ContentsLeft}>
          {/* Feather icon for going back */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.chevron}>
            <Feather name="chevron-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.TextArea}>{title}</Text>
        </View>
        <View style={styles.ContentsRight}>
          {/* WelfareScreen에서는 돋보기 아이콘 숨김 */}
          {!isSearchScreen && (
            <TouchableOpacity onPress={() => navigation.navigate('WelfareSearch')}>
              <Search />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white000,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  topBarContents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  ContentsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ContentsRight: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 24,
    height: 24,
  },
  TextArea: {
    ...textStyles.title18SemiBold,
    color: colors.gray900,
    textAlign: 'center',
  },
  chevron: {
    marginRight: 8,
  },
});

export default WelfareHeader;
