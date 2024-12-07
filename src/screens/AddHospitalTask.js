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
import { LogBox } from 'react-native';

// 특정 경고 메시지를 무시
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const AddHospitalTask = ({ route }) => {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기
  const [selectedCategory, setSelectedCategory] = useState(route.params?.selectedCategory || null);
  const [selectedTime, setSelectedTime] = useState(null); // 선택된 이동 방식
  const [name, setName] = useState(route.params?.familyName || '김구름');

  // 카테고리별 페이지 맵핑
  const categoryRoutes = {
    meal: 'AddMealTask',
    medication: 'AddPillTask',
    others: 'AddOthersTask',
    rest: 'AddRestTask',
  };

  // 카테고리 선택 처리
  const handleCategorySelect = (category) => {
    if (selectedCategory === category) return; // 이미 선택된 카테고리라면 이동하지 않음
    setSelectedCategory(category);

    const route = categoryRoutes[category] || 'AddHospitalTask'; // 기본 경로 설정
    navigation.navigate(route); // 카테고리별 페이지로 이동
  };

  const handleRegister = () => {
    // 특정 화면(HomeScreen)으로 바로 이동하며 현재 화면 대체
    navigation.replace('HomeScreen'); // 애니메이션 없이 HomeScreen으로 이동
  };

  const segments = [
    { label: '도보', value: 'walk' },
    { label: '택시', value: 'taxi' },
    { label: '대중교통', value: 'public' },
    { label: '자동차', value: 'car' },
  ];

  return (
    <View style={styles.container}>
      {/* ScrollView로 컴포넌트 렌더링 */}
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* 카테고리 선택 */}
        <View style={styles.component}>
          <CategoryPicker
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </View>

        {/* 돌보미 선택 */}
        <View style={styles.component}>
          <CaregiverSelectionRow
            label="돌보미 선택"
            initialValue={name}
            onValueChange={setName} // 부모 상태 업데이트
          />
        </View>

        {/* 작업 이름 입력 */}
        <View style={styles.component}>
          <TaskNameInput />
        </View>

        {/* 일정 일자 선택 */}
        <View style={styles.component}>
          <TaskDatePickerButton defaultText="일정 일자 선택" />
        </View>

        {/* 시작 시간 및 종료 시간 */}
        <View style={styles.component}>
          <StartTimeEndTime />
        </View>

        {/* 알림 설정 */}
        <View style={styles.component}>
          <TaskIsAlarmed />
        </View>

        {/* 반복 설정 */}
        <View style={styles.component}>
          <TaskRepeat />
        </View>

        {/* 이동 방식 선택 */}
        <View style={styles.component}>
          <SegmentedControl
            segments={segments}
            onSegmentPress={setSelectedTime}
            selectedSegments={selectedTime}
            label="이동 방식"
            isRequired={true}
          />
        </View>

        {/* 장소 입력 */}
        <View style={styles.component}>
          <TaskPlace />
        </View>

        {/* 메모 입력 */}
        <View style={styles.component}>
          <TaskMemo />
        </View>

        {/* 등록 버튼 */}
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
    paddingVertical: 24,
  },
  component: {
    marginBottom: 24,
  },
});

export default AddHospitalTask;
