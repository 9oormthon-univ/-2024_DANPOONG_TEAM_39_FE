import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CategoryPicker from '../components/atoms/CategoryPicker';
import fonts from '../styles/fonts';
import colors from '../styles/colors';
import SegmentedControl from '../components/atoms/SegmentedControl';
const AddMealTask = ({ route }) => {
    // route.params에서 selectedCategory 값을 가져와 초기값으로 설정
    const [selectedCategory, setSelectedCategory] = useState(route.params?.selectedCategory || null);
    const [selectedTime, setSelectedTime] = useState(null); // 선택된 식사 시간 

    const segments = [
        { label: '아침', value: 'morning' },
        { label: '점심', value: 'lunch' },
        { label: '저녁', value: 'dinner' },
        { label: '기타', value: 'others' },
      ];
    
    const handleSegmentPress = (value) => {
        setSelectedTime(value);
        //console.log('선택된 세그먼트:', value); 
    };

    return (
        <View style={styles.container}>
            {/* 카테고리 선택 컴포넌트 */}
            <View style={styles.pickerContainer}>
                <CategoryPicker
                    selectedCategory={selectedCategory} // 초기값 전달
                    onSelectCategory={(category) => setSelectedCategory(category)} // 선택된 값 업데이트
                />

                <SegmentedControl
                    segments={segments}
                    onSegmentPress={handleSegmentPress}
                    selectedSegment={selectedTime}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray050, // 배경색 화이트로 설정
  },
  pickerContainer: {
    position: 'absolute', // 절대 위치 지정
    top: '10%', // 화면 위에서부터 10% 위치에 배치
    width: '90%', // 화면 너비의 90% 사용
    maxWidth: 400, // 최대 너비 제한
    marginHorizontal: '5%', // 좌우 여백을 동일하게 설정 (가운데 정렬)
    zIndex: 10, // 다른 요소 위에 배치되도록 설정
  },

});

export default AddMealTask;
