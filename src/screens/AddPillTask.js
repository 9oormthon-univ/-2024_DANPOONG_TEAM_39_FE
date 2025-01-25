import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import axios from 'axios';

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

const AddPillTask = ({ route }) => {
  const navigation = useNavigation();

  // 상태 변수 정의
  const [id, setId] = useState(null);
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [date, setDate] = useState('');
  const [repeatCycle, setRepeatCycle] = useState(null);
  const [isAlarm, setIsAlarm] = useState(false);
  const [location, setLocation] = useState('');
  const [memo, setMemo] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [isShared, setIsShared] = useState(true);
  const [careAssignment, setCareAssignment] = useState(null);
  const [careAssignmentId, setCareAssignmentId] = useState(null);
  const [medications, setMedications] = useState(null);
  const [medicationType, setMedicationType] = useState([]);
  const [category, setCategory] = useState('medication');
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
        const response = await axios.get('http://34.236.139.89:8080/api/careCalendar/medication');
        console.log('Server Response:', response.data);
        
        const data = response.data.calendar;

        setId(data.id);
        setTitle(data.title);
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
        setMedications(data.medications);
        setSelectedProfile(data.careAssignmentId);
        setCategory(data.category);
        setCareAssignments(data.careAssignments);
        setMedicationType(data.medicationType);

        console.log('[CareAssignments]:', JSON.stringify(data.careAssignments, null, 2));
        console.log('Medication Type:', data.medicationType);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  const convertToServerTimeFormat = (time) => {
    if (!time) return null;

    const [period, rawTime] = time.split(' ');
    const [hours, minutes] = rawTime.split(':').map(Number);

    let formattedHours = period === '오후' && hours !== 12 ? hours + 12 : hours;
    if (period === '오전' && hours === 12) formattedHours = 0;

    return `${String(formattedHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
  };

  const convertToServerDateFormat = (date) => {
    if (!date) return null;

    const match = date.match(/(\d{4})년\s(\d{1,2})월\s(\d{1,2})일/);
    if (!match) {
      console.error(`Invalid date format: ${date}`);
      return null;
    }

    const [, year, month, day] = match;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  const handleRegister = async () => {
    console.log('Register button clicked'); // 함수 호출 확인용 로그
    const payload = {
      title,
      eventType,
      startTime: convertToServerTimeFormat(startTime),
      endTime: convertToServerTimeFormat(endTime),
      date: convertToServerDateFormat(date),
      repeatCycle,
      isAllDay,
      isAlarm,
      location,
      memo,
      isShared,
      careAssignment,
      careAssignmentId: selectedProfile,
      medicationType,
      category,
    };

    try {
      const response = await axios.post('http://34.236.139.89:8080/api/careCalendar/medication', payload);
      console.log('Successfully posted data:', response.data);
      navigation.replace('HomeScreen');
    } catch (error) {
      console.error('Error posting data:', error);
    }
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
            selectedCategory={category}
            onSelectCategory={(value) => setCategory(value)}
          />
        </View>

        <View style={styles.component}>
          <CaregiverSelectionRow
            careAssignments={careAssignments}
            selectedProfile={selectedProfile}
            isCaregiverNotNeeded={isCaregiverNotNeeded}
            onProfileSelect={(profileId) => {
              if (!isCaregiverNotNeeded) {
                setSelectedProfile(profileId);
                setCareAssignmentId(profileId);
              }
            }}
            onToggleCheck={() => setIsCaregiverNotNeeded(!isCaregiverNotNeeded)}
          />
        </View>

        <View style={styles.component}>
          <MedicationTypeButton
            onAddType={(type) => {
            console.log('Adding medication type:', type);
            setMedicationType([...(medicationType || []), type]);
            }}
            onDeleteType={(type) => {
            console.log('Deleting medication type:', type);
            setMedicationType((medicationType || []).filter((item) => item !== type));
            }}
          />
        </View>

        <View style={styles.component}>
          <TaskNameInput value={title} onValueChange={(value) => setTitle(value)} />
        </View>

        <View style={styles.component}>
          <TaskDatePickerButton selectedDate={date} onDateChange={(value) => setDate(value)} />
        </View>

        <View style={styles.component}>
          <StartTimeEndTime
            startTime={startTime}
            endTime={endTime}
            isChecked={isCheckedStartTime}
            onStartTimeChange={(value) => setStartTime(value)}
            onEndTimeChange={(value) => setEndTime(value)}
            onToggleCheck={() => setIsCheckedStartTime(!isCheckedStartTime)}
          />
        </View>

        <View style={styles.component}>
          <TaskIsAlarmed isAlarmed={isAlarm} onToggleAlarm={(value) => setIsAlarm(value)} />
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
            onToggleCheck={() => setIsLocationChecked(!isLocationChecked)}
          />
        </View>

        <View style={styles.component}>
          <TaskMemo memo={memo} onValueChange={(value) => setMemo(value)} />
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
    paddingVertical: 24,
  },
  component: {
    marginBottom: 24,
  },
});

export default AddPillTask;
