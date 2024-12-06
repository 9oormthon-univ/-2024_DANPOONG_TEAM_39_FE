import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import textStyles from '../../styles/textStyles';
import Phone from '../../assets/images/modal_phone.svg';
import colors from '../../styles/colors';

const WelfareRecommendation = () => {
  return (
    <View style={styles.fitContainer}>
      <View style={styles.fitTop}>
        <View style={styles.TopCenter}>
          <Text style={styles.TopTitle}>일상돌봄 서비스 사업</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.TopBody}>
            일상생활에 돌봄이 필요한 중장년과 가족돌봄청년에게 필요한 지원을 통해 삶의 여유를 제공합니다.
          </Text>
        </View>
      </View>
      <View style={styles.fitBottom}>
        <View style={styles.BottomContents}>
          <View style={styles.BottomIcon}>
            <Phone />
          </View>
          <Text style={styles.BottomNumber}>044-202-3226</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fitContainer: {
    flexDirection: 'column',
    backgroundColor: colors.white000,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 124,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  fitTop: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: '100%',
  },
  TopCenter: {
    flexDirection: 'column',
    width: '100%',
  },
  TopTitle: {
    ...textStyles.title16SemiBold,
    color: colors.gray900,
    textAlign: 'left',
    overflow: 'hidden',
    marginBottom: 7,
    minHeight: 14,
  },
  TopBody: {
    ...textStyles.subtitle12Bold14,
    color: colors.primary001,
    textAlign: 'left',
    overflow: 'hidden',
  },
  fitBottom: {
    flexDirection: 'row',
    backgroundColor: '#ff7f00',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  BottomContents: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomIcon: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  BottomNumber: {
    ...textStyles.title16SemiBold,
    color: '#fdfcfc',
    textAlign: 'left',
    overflow: 'hidden',
    paddingTop: 1,
  },
});

export default WelfareRecommendation;
