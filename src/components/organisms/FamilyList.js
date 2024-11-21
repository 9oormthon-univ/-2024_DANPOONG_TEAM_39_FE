import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import FamilyProfile from '../atoms/FamilyProfile';

const FamilyList = ({ Profiles }) => {
  return (
    <View style={styles.container}>
      {/* 첫 번째 프로필을 고정 */}
      <FamilyProfile name={Profiles[0].name} imagePath={Profiles[0].imagePath} />

      {/* 나머지 프로필들은 가로 스크롤 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {Profiles.slice(1).map((profile, index) => (
          <FamilyProfile key={index + 1} name={profile.name} imagePath={profile.imagePath} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16, // 좌우 여백을 16px로 설정
    flexDirection: 'row', // 전체 가로 배치
    alignItems: 'center', // 세로 가운데 정렬
    backgroundColor: '#FF7F00',
  },
  scrollContainer: {
    marginLeft: 20,
    flexDirection: 'row', // 자식 요소들을 가로로 배치
    gap: 8,
    alignItems: 'center',
  },
});

export default FamilyList;
