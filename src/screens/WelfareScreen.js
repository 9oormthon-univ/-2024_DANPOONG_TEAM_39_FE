import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import WelfareRecommendation from '../components/molecules/WelfareRecommendation';
import WelfareInfo from '../components/molecules/WelfareInfo';
import textStyles from '../styles/textStyles';
import colors from '../styles/colors';
import WelfareHeader from '../components/templates/WelfareHeader';

const WelfareScreen = ({ navigation }) => {
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

        {/* Scrollable Content */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* FitWelArea */}
          <View style={styles.FitWelArea}>
            <Text style={styles.FitWelText.Text_d}>
              <Text style={styles.FitWelText.Text_name}>최영인 </Text>님이 신청 가능한 복지서비스
            </Text>
            <TouchableOpacity style={styles.FitWelCom}>
              <WelfareRecommendation />
            </TouchableOpacity>
          </View>

          {/* 추천 서비스 섹션 */}
          <View style={styles.WelfareInfo}>
            <Text style={styles.WelfareInfoText}>추천하는 복지서비스</Text>
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
    paddingBottom: 20, // 스크롤 끝에 여유 공간 추가
  },
  FitWelArea: {
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 12,
    backgroundColor: colors.gray050,
  },
  FitWelText: {
    Text_d: {
      ...textStyles.title16SemiBold,
      textAlign: 'left',
      marginBottom: 12,
      color: colors.gray900,
    },
    Text_name: {
      ...textStyles.title16SemiBold,
      color: colors.primary001,
    },
  },
  FitWelCom: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  WelfareInfo: {
    paddingHorizontal: 20,
    marginVertical: 18,
    backgroundColor: colors.gray050,
  },
  WelfareInfoText: {
    ...textStyles.title16SemiBold,
    color: colors.gray800,
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

export default WelfareScreen;
