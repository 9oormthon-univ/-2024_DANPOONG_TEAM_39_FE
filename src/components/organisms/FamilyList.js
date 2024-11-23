import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

const FamilyList = ({ Profiles, onSelectProfile }) => {
  if (!Profiles || Profiles.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>프로필 정보가 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* 첫 번째 프로필을 고정 */}
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => onSelectProfile(Profiles[0])} // 첫 번째 프로필 클릭
      >
        <Image source={Profiles[0].imagePath} style={styles.image} />
        <Text style={styles.text}>{Profiles[0].name}</Text>
      </TouchableOpacity>

      {/* 나머지 프로필들은 가로 스크롤 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {Profiles.slice(1).map((profile, index) => (
          <TouchableOpacity
            key={index + 1}
            style={styles.profileButton}
            onPress={() => onSelectProfile(profile)} // 나머지 프로필 클릭
          >
            <Image source={profile.imagePath} style={styles.image} />
            <Text style={styles.text}>{profile.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF7F00',
  },
  scrollContainer: {
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileButton: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  text: {
    marginTop: 5,
    fontSize: 14,
    color: '#FFF',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#FF7F00',
  },
});

export default FamilyList;
