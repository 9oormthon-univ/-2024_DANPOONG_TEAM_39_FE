import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoryPicker from '../components/atoms/CategoryPicker';
import SegmentedControl from '../components/atoms/SegmentedControl';
import CaregiverSelectionRow from '../components/molecules/CaregiverSelectionRow';
import TaskNameInput from '../components/molecules/TaskNameInput';
import TaskDatePickerButton from '../components/atoms/TaskDatePickerButton';
import StartTimeEndTime from '../components/molecules/StartTimeEndTime';
import TaskIsAlarmed from '../components/molecules/TaskIsAlarmed';
import TaskPlace from '../components/molecules/TaskPlace';
import TaskMemo from '../components/molecules/TaskMemo';
import TaskAbledButton from '../components/atoms/TaskAbledButton';
import colors from '../styles/colors';
import { LogBox } from 'react-native';
import axios from 'axios';
import TaskRepeat from '../components/atoms/TaskRepeat';

// 특정 경고 메시지를 무시
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const AddRestTask = ({ route }) => {
  const navigation = useNavigation();

  // JSON 데이터와 매핑된 상태 관리 변수들
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [repeatCycle, setRepeatCycle] = useState(null);
  const [isAllDay, setIsAllDay] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [location, setLocation] = useState('');
  const [memo, setMemo] = useState('');
  const [isShared, setIsShared] = useState(false);
  const [careAssignment, setCareAssignment] = useState(null);
  const [careAssignmentId, setCareAssignmentId] = useState(null);
  const [meal, setMeal] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [rest, setRest] = useState(null);
  const [medications, setMedications] = useState([]);
  const [others, setOthers] = useState([]);
  const [myCalendar, setMyCalendar] = useState(null);
  const [category, setCategory] = useState('rest');
  const [restType, setRestType] = useState([]);
  const [careAssignments, setCareAssignments] = useState([
    {
      id: null,
      member: {
        id: null,
        name: null,
        alias: '',
        age: 0,
        gender: null,
        email: '',
      },
      email: '',
      relationship: '',
      calendar: null,
    },
  ]);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isCaregiverNotNeeded, setIsCaregiverNotNeeded] = useState(false);

  const [isLocationChecked, setIsLocationChecked] = useState(false); // 자택 여부
  const [isCheckedStartTime, setIsCheckedStartTime] = useState(false); // StartTimeEndTime 체크박스 상태

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://34.236.139.89:8080/api/careCalendar/rest');
        console.log('Server Response:', response.data); // 서버에서 받은 전체 데이터를 출력
  
        const data = response.data.calendar;
  
        console.log('Calendar Data:', data); // calendar 부분의 데이터 출력
  
        setId(data.id);
        setTitle(data.title);
        setEventType(data.eventType);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setDate(data.date);
        setRepeatCycle(data.repeatCycle);
        setIsAllDay(data.isAllday);
        setIsAlarm(data.isAlarm);
        setLocation(data.location);
        setMemo(data.memo);
        setIsShared(data.isShared);
        setCareAssignment(data.careAssignment);
        setCareAssignmentId(data.careAssignmentId);
        setMeal(data.meal);
        setHospital(data.hospital);
        setRest(data.rest);
        setMedications(data.medications);
        setOthers(data.others);
        setMyCalendar(data.myCalendar);
        setCategory(data.category);
        setCareAssignments(data.careAssignments);
        setRestType(response.data.restType);
        console.log('[CareAssignments]:', JSON.stringify(data.careAssignments, null, 2)); // careAssignments만 보기 좋게 출력
  
        console.log('Rest Type:', response.data.restType); // restType 부분 데이터 출력
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  const handleCaregiverToggle = () => {
    setIsCaregiverNotNeeded(!isCaregiverNotNeeded);
    if (!isCaregiverNotNeeded) {
      setSelectedProfile(null); // '필요하지 않음' 선택 시 프로필 초기화
    }
  };

  const handleToggleLocationCheck = () => {
    setIsLocationChecked(!isLocationChecked);
    setLocation(!isLocationChecked ? '자택' : '');
  };

  const handleToggleCheckStartTime = () => {
    const defaultStart = '오전 6:00';
    const defaultEnd = '오후 10:00';
    setIsCheckedStartTime(!isCheckedStartTime);
    if (!isCheckedStartTime) {
      setStartTime(defaultStart);
      setEndTime(defaultEnd);
    } else {
      setStartTime('');
      setEndTime('');
    }
  };

  // const handleRegister = async () => {
  //   const payload = {
  //     id,
  //     title,
  //     eventType,
  //     startTime,
  //     endTime,
  //     date,
  //     repeatCycle,
  //     isAllDay,
  //     isAlarm,
  //     location,
  //     memo,
  //     isShared,
  //     careAssignment,
  //     careAssignmentId,
  //     meal,
  //     hospital,
  //     rest,
  //     medications,
  //     others,
  //     myCalendar,
  //     category,
  //   };

  //   try {
  //     const response = await axios.post('http://34.236.139.89:8080/api/careCalendar/rest', payload);
  //     console.log('Successfully posted data:', response.data);
  //     navigation.replace('HomeScreen');
  //   } catch (error) {
  //     console.error('Error posting data:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.component}>
          <CategoryPicker
            selectedCategory={category}
            onSelectCategory={(value) => setCategory(value)}
          />
        </View>

        <View style={styles.component}>
          <SegmentedControl
            segments={restType.map((type) => ({ label: type, value: type }))}
            onSegmentPress={(value) => setRest(value)}
            selectedSegment={rest}
            label="휴식 카테고리"
            isRequired={true}
          />
        </View>

        <View style={styles.component}>
          <CaregiverSelectionRow
            careAssignments={careAssignments} // 서버에서 가져온 데이터 전달
            selectedProfile={selectedProfile}
            isCaregiverNotNeeded={isCaregiverNotNeeded}
            onProfileSelect={(profileId) => setSelectedProfile(profileId)}
            onToggleCheck={handleCaregiverToggle}
          />
        </View>

        <View style={styles.component}>
          <TaskNameInput
            value={title} 
            onValueChange={(value) => setTitle(value)}
          />
        </View>

        <View style={styles.component}>
          <TaskDatePickerButton
            selectedDate={date}
            onDateChange={(value) => setDate(value)}
          />
        </View>

        <View style={styles.component}>
          <StartTimeEndTime
            startTime={startTime}
            endTime={endTime}
            isChecked={isCheckedStartTime}
            onStartTimeChange={(value) => setStartTime(value)}
            onEndTimeChange={(value) => setEndTime(value)}
            onToggleCheck={handleToggleCheckStartTime}
          />
        </View>

        <View style={styles.component}>
          <TaskIsAlarmed
            isAlarmed={isAlarm}
            onToggleAlarm={(value) => setIsAlarm(value)}
          />
        </View>

        <View style={styles.component}>
          <TaskRepeat
            placeholder="반복 주기"
            repeatCycle={repeatCycle}
            onSelectOption={(option) => setRepeatCycle(option)}
          />
        </View>

        <View style={styles.component}>
          <TaskPlace
            location={location}
            isChecked={isLocationChecked}
            onValueChange={(value) => setLocation(value)}
            onToggleCheck={handleToggleLocationCheck}
          />
        </View>

        <View style={styles.component}>
          <TaskMemo
            memo={memo}
            onValueChange={(value) => setMemo(value)}
          />
        </View>

        {/* <View style={styles.component}>
          <TaskAbledButton text="등록" onPress={handleRegister} />
        </View> */}
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

export default AddRestTask;
