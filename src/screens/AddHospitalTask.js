import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // React Navigation 훅
import colors from '../styles/colors';

import CategoryPicker from '../components/atoms/CategoryPicker';
import CaregiverSelectionRow from '../components/molecules/CaregiverSelectionRow';
import TaskNameInput from '../components/molecules/TaskNameInput';
import TaskDatePickerButton from '../components/atoms/TaskDatePickerButton';
import StartTimeEndTime from '../components/molecules/StartTimeEndTime';
import TaskIsAlarmed from '../components/molecules/TaskIsAlarmed';
import TaskPlace from '../components/molecules/TaskPlace';
import TaskMemo from '../components/molecules/TaskMemo';
import SegmentedControl from '../components/atoms/SegmentedControl';
import TaskAbledButton from '../components/atoms/TaskAbledButton';
import TaskRepeat from '../components/atoms/TaskRepeat';

const AddHospitalTask = ({ route }) => {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기
  const [selectedCategory, setSelectedCategory] = useState(route.params?.selectedCategory || null);
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 식사 시간
  const [name, setName] = useState(route.params?.familyName || '김구름');
  const segments = [
    { label: '도보', value: 'walk' },
    { label: '택시', value: 'taxi' },
    { label: '대중교통', value: 'public' },
    { label: '자동차', value: 'car' },
  ];

  const handleSegmentPress = (value) => {
    setSelectedTime(value);
  };

  const handleRegister = () => {
    // 특정 화면(HomeScreen)으로 바로 이동하며 현재 화면 대체
    navigation.replace('HomeScreen'); // 애니메이션 없이 HomeScreen으로 이동
  };

  return (
    <View style={styles.container}>
      {/* ScrollView로 컴포넌트 렌더링 */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.component}>
          <CategoryPicker
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => setSelectedCategory(category)}
          />
        </View>
        <View style={styles.component}>
          <CaregiverSelectionRow
            label="돌보미 가족"
            initialValue={name}
            onValueChange={(value) => {}}
          />
        </View>
        <View style={styles.component}>
          <TaskNameInput />
        </View>
        <View style={styles.component}>
          <TaskDatePickerButton defaultText="일정 일자 선택" />
        </View>
        <View style={styles.component}>
          <StartTimeEndTime />
        </View>
        <View style={styles.component}>
          <TaskIsAlarmed />
        </View>
        <View style={styles.component}>
          <TaskRepeat />
        </View>
        <View style={styles.component}>
          <SegmentedControl
            segments={segments}
            onSegmentPress={handleSegmentPress}
            selectedSegments={selectedTime}
            label="이동 방식"
            isRequired={true}
          />
        </View>
        <View style={styles.component}>
          <TaskPlace />
        </View>
        <View style={styles.component}>
          <TaskMemo />
        </View>
        <View style={styles.component}>
          <TaskAbledButton text="등록" onPress={handleRegister} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray050,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingVertical: 24, // ScrollView 상하 여백
  },
  component: {
    marginBottom: 24, // 컴포넌트 간 간격
  },
});

export default AddHospitalTask;
