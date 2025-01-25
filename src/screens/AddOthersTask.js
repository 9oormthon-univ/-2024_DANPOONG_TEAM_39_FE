import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CategoryPicker from '../components/atoms/CategoryPicker';
import CaregiverSelectionRow from '../components/molecules/CaregiverSelectionRow';
import TaskNameInput from '../components/molecules/TaskNameInput';
import TaskDatePickerButton from '../components/atoms/TaskDatePickerButton';
import StartTimeEndTime from '../components/molecules/StartTimeEndTime';
import TaskIsAlarmed from '../components/molecules/TaskIsAlarmed';
import TaskPlace from '../components/molecules/TaskPlace';
import TaskMemo from '../components/molecules/TaskMemo';
import TaskAbledButton from '../components/atoms/TaskAbledButton';
import TaskRepeat from '../components/atoms/TaskRepeat';
import colors from '../styles/colors';

const AddOthersTask = () => {
  const navigation = useNavigation();

  // 상태 관리
  const [title, setTitle] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [date, setDate] = useState(null);
  const [repeatCycle, setRepeatCycle] = useState(null);
  const [isAlarm, setIsAlarm] = useState(false);
  const [location, setLocation] = useState(null);
  const [memo, setMemo] = useState(null);
  const [careAssignments, setCareAssignments] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [category, setCategory] = useState('others');

  // 초기 데이터 로드 (GET 요청)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://34.236.139.89:8080/api/careCalendar/others');
        console.log('Server Response:', response.data);

        const data = response.data.calendar;

        setTitle(data.title);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setDate(data.date);
        setRepeatCycle(data.repeatCycle);
        setIsAlarm(data.isAlarm);
        setLocation(data.location);
        setMemo(data.memo);
        setCareAssignments(data.careAssignments);
        setSelectedProfile(data.careAssignmentId);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  // 서버 형식 변환 함수
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
    if (!match) return null;
    const [, year, month, day] = match;
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // 등록 처리 (POST 요청)
  const handleRegister = async () => {
    const payload = {
      title,
      startTime: convertToServerTimeFormat(startTime),
      endTime: convertToServerTimeFormat(endTime),
      date: convertToServerDateFormat(date),
      repeatCycle,
      isAlarm,
      location,
      memo,
      category,
      careAssignmentId: selectedProfile,
    };

    try {
      const response = await axios.post('http://34.236.139.89:8080/api/careCalendar/others', payload);
      console.log('Successfully posted data:', response.data);
      navigation.replace('HomeScreen');
    } catch (error) {
      console.error('Failed to post data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.component}>
          <CategoryPicker selectedCategory={category} onSelectCategory={setCategory} />
        </View>
        <View style={styles.component}>
          <CaregiverSelectionRow
            careAssignments={careAssignments}
            selectedProfile={selectedProfile}
            onProfileSelect={setSelectedProfile}
          />
        </View>
        <View style={styles.component}>
          <TaskNameInput value={title} onValueChange={setTitle} />
        </View>
        <View style={styles.component}>
          <TaskDatePickerButton selectedDate={date} onDateChange={setDate} />
        </View>
        <View style={styles.component}>
          <StartTimeEndTime
            startTime={startTime}
            endTime={endTime}
            onStartTimeChange={setStartTime}
            onEndTimeChange={setEndTime}
          />
        </View>
        <View style={styles.component}>
          <TaskIsAlarmed isAlarmed={isAlarm} onToggleAlarm={setIsAlarm} />
        </View>
        <View style={styles.component}>
          <TaskRepeat repeatCycle={repeatCycle} onSelectOption={setRepeatCycle} />
        </View>
        <View style={styles.component}>
          <TaskPlace location={location} onValueChange={setLocation} />
        </View>
        <View style={styles.component}>
          <TaskMemo memo={memo} onValueChange={setMemo} />
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


export default AddOthersTask;
