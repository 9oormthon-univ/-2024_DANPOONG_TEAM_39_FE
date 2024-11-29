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
import TaskRepeat from '../components/atoms/TaskRepeat';
import TaskAbledButton from '../components/atoms/TaskAbledButton';
import MedicationTypeButton from '../components/atoms/MedicationTypeButton';
import TaskPlace from '../components/molecules/TaskPlace';
import TaskMemo from '../components/molecules/TaskMemo';
import { LogBox } from 'react-native';

// 특정 경고 메시지를 무시
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);


const AddPillTask = ({ route }) => {
  const navigation = useNavigation(); // 네비게이션 객체 가져오기
  const [selectedCategory, setSelectedCategory] = useState(route.params?.selectedCategory || null);
  const [name, setName] = useState(route.params?.familyName || '김구름');
  const [startSleepTime, setStartSleepTime] = useState('09:00'); // 초기값
  const [endSleepTime, setEndSleepTime] = useState('20:00'); // 초기값

  // 카테고리별 페이지 맵핑
  const categoryRoutes = {
    hospital: 'AddHospitalTask',
    meal: 'AddMealTask',
    others: 'AddOthersTask',
    rest: 'AddRestTask',
  };

  // 카테고리 선택 처리
  const handleCategorySelect = (category) => {
    if (selectedCategory === category) return; // 이미 선택된 카테고리라면 이동하지 않음
    setSelectedCategory(category);

    const route = categoryRoutes[category] || 'AddPillTask'; // 기본 경로 설정
    navigation.navigate(route); // 카테고리별 페이지로 이동
  };

  const handleRegister = () => {
    // 등록 후 홈 화면으로 이동
    navigation.replace('HomeScreen'); // 애니메이션 없이 HomeScreen으로 이동
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.component}>
          <CategoryPicker
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
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
          <MedicationTypeButton
            onAddType={(type) => console.log('Added Medication Type:', type)}
            onDeleteType={(type) => console.log('Deleted Medication Type:', type)}
          />
        </View>
        <View style={styles.component}>
          <TaskNameInput />
        </View>
        <View style={styles.component}>
          <TaskDatePickerButton defaultText="일정 일자 선택" />
        </View>
        <View style={styles.component}>
          <StartTimeEndTime
            startSleepTime={startSleepTime}
            endSleepTime={endSleepTime}
            onTimeChange={({ startTime, endTime }) => {
              if (startTime !== undefined) setStartSleepTime(startTime);
              if (endTime !== undefined) setEndSleepTime(endTime);
            }}
          />
        </View>
        <View style={styles.component}>
          <TaskIsAlarmed />
        </View>
        <View style={styles.component}>
          <TaskRepeat />
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

export default AddPillTask;
