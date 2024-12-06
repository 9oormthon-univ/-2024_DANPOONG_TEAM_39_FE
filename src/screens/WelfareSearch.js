import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import WelfareInfo from '../components/molecules/WelfareInfo';
import textStyles from '../styles/textStyles';
import colors from '../styles/colors';
import WelfareHeader from '../components/templates/WelfareHeader';
import Search from '../assets/images/lucide_search.svg';

const WelfareSearch = ({ navigation }) => {
  const [inputValue, setInputValue] = useState(''); // 검색어 상태
  const [searchResults, setSearchResults] = useState(12); // 검색 결과 개수 (더미 데이터)

  return (
    <>
      {/* 상단 SafeAreaView만 적용 */}
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.white000 }} />

      {/* 나머지 화면 */}
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.header}>
          <WelfareHeader />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Text Field */}
          <View style={styles.textFieldContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="복지 서비스 검색..."
              placeholderTextColor={colors.gray600}
              value={inputValue} // 입력된 값
              onChangeText={(text) => setInputValue(text)} // 값 변경 시 업데이트
            />
            <Search style={styles.searchIcon} />
          </View>

          {/* 검색 정보 */}
          <View style={styles.SearchInfo}>
            <Text style={styles.SearchInfoText}>
              "{inputValue}" 검색 결과{' '}
              <Text style={styles.SearchResultsCount}>{searchResults}건</Text>
            </Text>
          </View>

          {/* 복지 정보 섹션 */}
          <View style={styles.WelfareArea}>
            <WelfareInfo />
          </View>
          <View style={styles.WelfareArea}>
            <WelfareInfo />
          </View>
          <View style={styles.WelfareArea}>
            <WelfareInfo />
          </View>
          <View style={styles.WelfareArea}>
            <WelfareInfo />
          </View>
          <View style={styles.WelfareArea}>
            <WelfareInfo />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray050,
  },
  header: {
    backgroundColor: colors.gray050,
  },
  scrollContent: {
    paddingBottom: 20, // 스크롤 가능한 내용의 아래 여백
  },
  textFieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white000,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray300,
    marginHorizontal: 16,
    marginTop: 18,
  },
  textInput: {
    flex: 1,
    ...textStyles.body14Regular,
    color: colors.gray900,
    marginRight: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
  },
  SearchInfo: {
    paddingHorizontal: 20,
    marginVertical: 18,
  },
  SearchInfoText: {
    ...textStyles.title16SemiBold,
    color: colors.gray400,
  },
  SearchResultsCount: {
    color: colors.primary001, // 검색 결과 숫자 색상
    ...textStyles.body14Medium, // 동일한 텍스트 스타일
  },
  WelfareArea: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray050,
  },
});

export default WelfareSearch;
