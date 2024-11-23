import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
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

const AddHospitalTask = ({ route }) => {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기
  const [selectedCategory, setSelectedCategory] = useState(route.params?.selectedCategory || null);
  const [name, setName] = useState(route.params?.familyName || '김구름');

  const handleRegister = () => {
    // 특정 화면(HomeScreen)으로 바로 이동하며 현재 화면 대체
    navigation.replace('HomeScreen'); // 애니메이션 없이 HomeScreen으로 이동
  };

  // 컴포넌트 배열 정의
  const components = [
    {
      key: 'categoryPicker',
      component: (
        <CategoryPicker
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      ),
    },
    {
      key: 'caregiverSelection',
      component: (
        <CaregiverSelectionRow
          label="돌보미 가족"
          initialValue={name}
          onValueChange={(value) => {}}
        />
      ),
    },
    { key: 'taskNameInput', component: <TaskNameInput /> },
    {
      key: 'taskDatePicker',
      component: <TaskDatePickerButton defaultText="일정 일자 선택" />,
    },
    { key: 'startTimeEndTime', component: <StartTimeEndTime /> },
    { key: 'taskIsAlarmed', component: <TaskIsAlarmed /> },
    {
      key: 'segmentedControl',
      component: (
        <SegmentedControl
          segments={[
            { label: '도보', value: 'walk' },
            { label: '택시', value: 'taxi' },
            { label: '대중교통', value: 'public' },
            { label: '자동차', value: 'car' },
          ]}
          onSegmentPress={(selectedValues) => {}}
        />
      ),
    },
    { key: 'taskPlace', component: <TaskPlace /> },
    { key: 'taskMemo', component: <TaskMemo /> },
    // "등록" 버튼 추가
    {
      key: 'registerButton',
      component: <TaskAbledButton text="등록" onPress={handleRegister} />,
    },
  ];

  return (
    <View style={styles.container}>
      {/* FlatList로 컴포넌트 렌더링 */}
      <FlatList
        data={components}
        renderItem={({ item }) => <View style={styles.component}>{item.component}</View>}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray050,
  },
  flatListContent: {
    paddingHorizontal: 20,
    paddingVertical: 24, // FlatList 상하 여백
  },
  component: {
    marginBottom: 24, // 컴포넌트 간 간격
  },
});

export default AddHospitalTask;
