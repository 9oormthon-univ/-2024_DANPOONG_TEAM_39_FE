import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import fonts from '../../styles/fonts';
import textStyles from '../../styles/textStyles';

const FamilyProfile = ({ name, imagePath }) => {
  return (
    <View style={styles.profileContainer}>
      <Image source={imagePath} style={styles.profileImage} />
      <Text
        style={styles.profileName}
        numberOfLines={1} // 한 줄만 표시
        ellipsizeMode="tail" // 말줄임표를 끝에 표시
      >{name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    width: 72,  // Modifier에서 width 적용
    height: 109, // Modifier에서 height 적용
    paddingVertical: 8, // Modifier에서 top, bottom padding 적용
    paddingHorizontal: 4, // Modifier에서 start, end padding 적용
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  profileName: {
    ...textStyles.title14Bold,
    textAlign: 'center',
    lineHeight: 21,
    color: '#FFFFFF',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export default FamilyProfile;
