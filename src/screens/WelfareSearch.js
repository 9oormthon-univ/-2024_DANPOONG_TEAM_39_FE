import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, ScrollView, Linking, TouchableOpacity } from 'react-native';
import axios from 'axios';
import WelfareHeader from '../components/templates/WelfareHeader';
import Search from '../assets/images/lucide_search.svg';
import { DOMParser } from 'xmldom';
import colors from '../styles/colors';
import textStyles from '../styles/textStyles';
import { WELFARE_SERVICE_KEY } from '@env';
import RightChevron from '../assets/images/lucide_chevron-right.svg'; //

// API 호출 함수 (복지 정보 가져오기)
const getWelfareData = async (searchWrd) => {
  const encodedSearchWrd = encodeURIComponent(searchWrd);
  const url = `http://apis.data.go.kr/B554287/NationalWelfareInformations/NationalWelfarelist?serviceKey=${WELFARE_SERVICE_KEY}&callTp=L&pageNo=1&numOfRows=10&srchKeyCode=001&searchWrd=${encodedSearchWrd}`;

  try {
    const response = await axios.get(url);
    console.log('API 응답 데이터:', response.data);

    // XML 파싱
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response.data, 'application/xml');

    // totalCount 가져오기
    const totalCount = xmlDoc.getElementsByTagName('totalCount')[0].textContent;

    // servNm, servDgst, servDtlLink 추출
    const serviceList = [];
    const servLists = xmlDoc.getElementsByTagName('servList');

    for (let i = 0; i < servLists.length; i++) {
      const servListItem = servLists[i];

      const servNm = servListItem.getElementsByTagName('servNm')[0].textContent;
      const servDgst = servListItem.getElementsByTagName('servDgst')[0].textContent;
      const servDtlLink = servListItem.getElementsByTagName('servDtlLink')[0].textContent;

      serviceList.push({ servNm, servDgst, servDtlLink });
    }
    return { totalCount, serviceList }; // totalCount와 serviceList 반환
  } catch (error) {
    console.error('API 요청 실패', error);
    return { totalCount: 0, serviceList: [] }; // 실패 시 기본 값 반환
  }
};

const WelfareSearch = ({ navigation }) => {
  const [inputValue, setInputValue] = useState(''); // 검색어 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [totalCount, setTotalCount] = useState(0); // 총 개수 상태

  // 검색 처리 함수
  const handleSearch = async () => {
    if (inputValue.trim() === '') return; // 검색어가 없으면 아무 것도 하지 않음
    setLoading(true); // 로딩 시작
    setSearchResults([]); // 이전 결과 초기화

    // 검색 결과 받아오기
    const { totalCount, serviceList } = await getWelfareData(inputValue);

    // 검색 결과 갱신
    setSearchResults(serviceList);  // 새로운 검색 결과로 업데이트
    setTotalCount(totalCount); // 총 개수 상태 업데이트
    setLoading(false); // 로딩 종료
  };

  // 링크 열기 함수
  const openLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('Failed to open URL:', err));
  };

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
            <TouchableOpacity onPress={handleSearch}>
              <Search style={styles.searchIcon} />
            </TouchableOpacity>
          </View>

          {/* 검색 정보 */}
          <View style={styles.SearchInfo}>
            <Text style={styles.SearchInfoText}>
              "{inputValue}" 검색 결과{' '}
              <Text style={styles.SearchResultsCount}> {totalCount}건</Text>
            </Text>
          </View>

          {/* 복지 정보 섹션 */}
          <View style={styles.WelfareArea}>
            {/* 매핑된 복지 서비스 목록 */}
            {searchResults.map((item, index) => (
              <View key={index} style={styles.WelContainer}>
                <View style={styles.WelCenter}>
                  <View style={styles.WelContents}>
                    <Text style={styles.WelTitle}>
                      {item.servNm} {/* 복지 서비스 이름 */}
                    </Text>
                    <Text numberOfLines={3} ellipsizeMode="tail" style={styles.WelText}>
                      {item.servDgst} {/* 복지 서비스 상세 내용 */}
                    </Text>
                    <TouchableOpacity onPress={() => openLink(item.servDtlLink)}>
                      <View style={styles.WelAdd}>
                        <Text style={styles.WelLink}>자세히 보기</Text>
                        <View style={styles.AddIcon}><RightChevron /></View>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* 로딩 상태 */}
          {loading && <Text style={styles.loadingText}>검색 중...</Text>}
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
  WelContainer: {
    flexDirection: 'column', // 수정: 세로 방향으로 변경
    paddingHorizontal: 16,
    paddingVertical: 16,
    alignItems: 'stretch', // 수정: 자식 요소가 전체 너비를 차지하도록
    justifyContent: 'flex-start', // 수정: 위쪽 정렬
    width: '100%',
    height: 126,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray100,
    backgroundColor: colors.white000,
  },
  WelCenter: {
    flexDirection: 'column',
    alignItems: 'flex-start', // 왼쪽 정렬
    justifyContent: 'flex-start',
    width: '100%',
  },
  WelContents: {
    flexDirection: 'column',
    width: '100%',
  },
  WelTitle: {
    ...textStyles.title16SemiBold,
    color: "#343332",
    textAlign: "left",
    overflow: "hidden",
    marginBottom: 7,
  },
  WelBody: {
    ...textStyles.subtitle12Medium14,
    color: "#82807d",
    textAlign: "left",
    overflow: "hidden",
    minHeight: 42,
    marginBottom: 8,
  },
  WelAdd: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  WelLink:{
    ...textStyles.subtitle12Bold14,
    color: "#ff7f00",
    textAlign: "right",
    overflow: "hidden",
    justifyContent:"center",
    marginRight: 4,
  },
  AddIcon:{
    width: 20,
    height: 20,
    alignItems:'center',
    justifyContent: 'center',
  },
});

export default WelfareSearch;
