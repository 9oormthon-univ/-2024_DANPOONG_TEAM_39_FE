import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
} from 'react-native';
import textStyles from '../../styles/textStyles';
import colors from '../../styles/colors';
import SettingIcon from '../../assets/images/sidebar_settings.svg';
import SearchIconn from '../../assets/images/sidebar_search.svg';
import RoundPlusIcon from '../../assets/images/sidebar_round_plus.svg';
import RoundPenIcon from '../../assets/images/sidebar_round_pen.svg';
import HandHeartIcon from '../../assets/images/sidebar_hand_heart.svg';
import ChartLineIcon from '../../assets/images/sidebar_chart_line.svg';

const { width: screenWidth } = Dimensions.get('window');

const SideBar = ({ visible, onClose, navigation }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const slideAnim = useRef(new Animated.Value(screenWidth)).current; // 초기 위치를 화면 너비로 설정

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0, // 최종 위치 (0px)
        duration: 300, // 애니메이션 지속 시간 (ms)
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenWidth, // 숨길 위치 (화면 너비)
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsVisible(false));
    }
  }, [visible, slideAnim]);

  if (!isVisible) return null;

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.overlay}>
        {/* 사이드바 애니메이션 적용 */}
        <TouchableWithoutFeedback>
          <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
            <Text style={styles.greeting}>
              <Text style={styles.highlight}>최영인</Text>
              <Text> 님,{'\n'}언제나 응원하고 있어요.</Text>
            </Text>

            {/* 메뉴 아이템 그룹 */}
            <View style={styles.frameParent}>
              {/* 복지 서비스 찾기 */}
              <TouchableOpacity
                style={[styles.menuItemContainer, styles.menuItemSpacing]}
                onPress={() => navigation.navigate('WelfareScreen')}
              >
                <SearchIconn style={styles.icon} />
                <Text style={styles.menuText}>복지 서비스 찾기</Text>
              </TouchableOpacity>
              <View style={styles.divider} />

              {/* 돌봄 리포트 */}
              <View style={[styles.menuItemContainer, styles.menuItemSpacing]}>
                <ChartLineIcon style={styles.icon} />
                <Text style={styles.menuText}>돌봄 리포트</Text>
              </View>
              <View style={styles.divider} />

              {/* 돌봄 가족 수정 */}
              <View style={[styles.menuItemContainer, styles.menuItemSpacing]}>
                <HandHeartIcon style={styles.icon} />
                <Text style={styles.menuText}>돌봄 가족 수정</Text>
              </View>
              <View style={styles.divider} />

              {/* 돌보미 가족 초대하기 */}
              <View style={[styles.menuItemContainer, styles.menuItemSpacing]}>
                <RoundPlusIcon style={styles.icon} />
                <Text style={styles.menuText}>돌보미 가족 초대하기</Text>
              </View>
              <View style={styles.divider} />

              {/* 마이페이지 */}
              <View style={[styles.menuItemContainer, styles.menuItemSpacing]}>
                <RoundPenIcon style={styles.icon} />
                <Text style={styles.menuText}>마이페이지</Text>
              </View>
              <View style={styles.divider} />
            </View>

            {/* 설정 아이콘 */}
            <View style={styles.settingContainer}>
              <View style={styles.settingDivider} />
              <SettingIcon style={styles.settingsIcon} />
            </View>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.65)',
    zIndex: 1000,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '70%',
    height: '100%',
    backgroundColor: colors.white000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  greeting: {
    position: 'absolute',
    top: 80,
    left: 20,
    textAlign: 'left',
    ...textStyles.title18Bold,
    color: colors.gray900,
  },
  highlight: {
    ...textStyles.title18Bold,
    color: colors.primary001,
  },
  frameParent: {
    marginTop: 170,
  },
  menuItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 36,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  menuText: {
    color: colors.gray900,
    ...textStyles.title14Bold,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
    marginVertical: 16,
  },
  settingContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.gray200,
    marginTop: 350,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  settingsIcon: {
    overflow: 'hidden',
  },
});

export default SideBar;
