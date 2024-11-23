import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const SegmentedControl = ({ segments, onSegmentPress, selectedSegments }) => {
  const [selected, setSelected] = useState(selectedSegments || []);

  const handleSegmentPress = (value) => {
    let updatedSelection;

    if (selected.includes(value)) {
      // 이미 선택된 세그먼트인 경우 제거
      updatedSelection = selected.filter((segment) => segment !== value);
    } else {
      // 선택되지 않은 세그먼트를 추가
      updatedSelection = [...selected, value];
    }

    setSelected(updatedSelection);
    onSegmentPress(updatedSelection); // 변경된 선택값을 부모 컴포넌트로 전달
  };

  return (
    <View style={styles.container}>
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <TouchableOpacity
            style={[
              styles.segment,
              selected.includes(segment.value) && styles.selectedSegment, // 선택된 세그먼트 강조
              index === 0 && styles.leftRounded, // 왼쪽 끝 모서리 둥글게
              index === segments.length - 1 && styles.rightRounded, // 오른쪽 끝 모서리 둥글게
            ]}
            onPress={() => handleSegmentPress(segment.value)}
          >
            <Text
              style={[
                styles.segmentText,
                selected.includes(segment.value) && styles.selectedText, // 선택된 텍스트 강조
              ]}
            >
              {segment.label}
            </Text>
          </TouchableOpacity>

          {/* 세그먼트 구분선 추가 (마지막 세그먼트 제외) */}
          {index < segments.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden', // 모서리 둥글게
    borderWidth: 1,
    borderColor: colors.gray200, // 테두리 색상
  },
  segment: {
    flex: 1, // 동일한 비율로 배치
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  selectedSegment: {
    borderWidth: 2,
    borderColor: colors.primary001,
    backgroundColor: colors.primary005, // 선택된 세그먼트의 배경색
  },
  segmentText: {
    fontSize: 16,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
  },
  selectedText: {
    color: colors.primary001, // 선택된 텍스트의 색상
    fontFamily: fonts.semiBold,
    fontSize: 16,
  },
  leftRounded: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  rightRounded: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  divider: {
    width: 1, // 구분선 두께
    backgroundColor: colors.gray200, // 구분선 색상
    height: '80%', // 구분선 높이
    alignSelf: 'center', // 세로 가운데 정렬
  },
});

export default SegmentedControl;
