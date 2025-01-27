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

// 특정 경고 메시지를 무시
LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const AddHospitalTask = ({ route }) => {
  const navigation = useNavigation();

  // 상태 관리 변수들
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('hospital');
  const [transportation, setTransportation] = useState('');
  const [transportationOptions, setTransportationOptions] = useState([]);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [isAlarm, setIsAlarm] = useState(false);
  const [location, setLocation] = useState('');
  const [memo, setMemo] = useState('');
  const [careAssignment, setCareAssignment] = useState(null);
  const [careAssignments, setCareAssignments] = useState([]);
  const [selectedCaregiver, setSelectedCaregiver] = useState(null);
  const [isCaregiverNotNeeded, setIsCaregiverNotNeeded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://34.236.139.89:8080/api/careCalendar/hospital');
        const data = response.data.calendar;

        setTitle(data.title);
        setDate(data.date);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setIsAllDay(data.isAllDay);
        setIsAlarm(data.isAlarm);
        setLocation(data.location);
        setMemo(data.memo);
        setCareAssignments(data.careAssignments);
        setSelectedCaregiver(data.careAssignmentId);
        setTransportation(data.transportation || '');
        setTransportationOptions(response.data.transportationType || []);
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
      category,
    };

    try {
      const response = await axios.post('http://34.236.139.89:8080/api/careCalendar/hospital', payload);
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
            selectedProfile={selectedCaregiver}
            isCaregiverNotNeeded={isCaregiverNotNeeded}
            onProfileSelect={(profileId) => {
              if (!isCaregiverNotNeeded) {
                setSelectedCaregiver(profileId);
              }
            }}
            onToggleCheck={() => setIsCaregiverNotNeeded(!isCaregiverNotNeeded)}
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
            onStartTimeChange={(value) => setStartTime(value)}
            onEndTimeChange={(value) => setEndTime(value)}
            isChecked={isAllDay}
            onToggleCheck={() => setIsAllDay(!isAllDay)}
          />
        </View>

        <View style={styles.component}>
          <TaskIsAlarmed
            isAlarmed={isAlarm}
            onToggleAlarm={(value) => setIsAlarm(value)}
          />
        </View>

        <View style={styles.component}>
          <SegmentedControl
            segments={transportationOptions.map((option) => ({ label: option, value: option }))}
            onSegmentPress={(value) => setTransportation(value)}
            selectedSegment={transportation}
            label="이동 방식"
            isRequired={true}
          />
        </View>

        <View style={styles.component}>
          <TaskPlace
            location={location}
            onValueChange={(value) => setLocation(value)}
          />
        </View>

        <View style={styles.component}>
          <TaskMemo
            memo={memo}
            onValueChange={(value) => setMemo(value)}
          />
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

export default AddHospitalTask;
