import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import textStyles from '../../styles/textStyles';
import RightChevron from '../../assets/images/lucide_chevron-right.svg';
import colors from '../../styles/colors';
const WelfareInfo = () => {
  return (
    <View style={styles.WelContainer}>
      <View style={styles.WelCenter}>
        <View style={styles.WelContents}>
          <Text style={styles.WelTitle}>
            (산재근로자) 사회심리재활지원
          </Text>
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.WelBody}>
            산업 재해 및 장해를 입은 근로자가 심리적 충격을 해소하고 재활할 수 있도록 지원합니다.
          </Text>
        </View>
        <View style={styles.WelAdd}>
          <Text style={styles.AddText}>자세히 보기</Text>
          <View style={styles.AddIcon}><RightChevron /></View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  AddText:{
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

export default WelfareInfo;