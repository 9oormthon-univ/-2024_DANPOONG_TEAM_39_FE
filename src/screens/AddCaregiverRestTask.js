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

const AddCaregiverRestTask = ({ route }) => {
    const navigation = useNavigation();
    // route에서 전달된 데이터 받기

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
    const [isShared, setIsShared] = useState(true);
    const [careAssignment, setCareAssignment] = useState(null);
    const [careAssignmentId, setCareAssignmentId] = useState(null);
    const [rest, setRest] = useState(null);
    const [category, setCategory] = useState('rest');
    const [restType, setRestType] = useState([]);
    const [careAssignments, setCareAssignments] = useState([{
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
    }]);

    const [selectedProfile, setSelectedProfile] = useState(null);
    const [isCaregiverNotNeeded, setIsCaregiverNotNeeded] = useState(false);

    const [isLocationChecked, setIsLocationChecked] = useState(false); // 자택 여부
    const [isCheckedStartTime, setIsCheckedStartTime] = useState(false); // StartTimeEndTime 체크박스 상태
    const { selectedCategory, apDate, apStartTime, apEndTime } = route.params;

    console.log('Selected Category:', selectedCategory);
    console.log('apDate:', apDate);
    console.log('apStartTime:', apStartTime);
    console.log('apEndTime:', apEndTime);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://34.236.139.89:8080/api/careCalendar/rest/caregiver?date=${apDate}&startTime=${apStartTime}&endTime=${apEndTime}`);
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
                setSelectedProfile(data.careAssignmentId);
                setRest(data.rest);
                setCategory(data.category);
                setCareAssignments(data.careAssignments);
                setRestType(response.data.restType);

                console.log('[CareAssignments]:', JSON.stringify(data.careAssignments, null, 2));
                console.log('Rest Type:', response.data.restType);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [selectedCategory, apDate, apStartTime, apEndTime]);

    const handleCaregiverToggle = () => {
        setIsCaregiverNotNeeded(!isCaregiverNotNeeded);
        if (!isCaregiverNotNeeded) {
            setSelectedProfile(null);
            setCareAssignmentId(null);
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

    const convertToServerTimeFormat = (time) => {
        if (!time) return null;

        const [period, rawTime] = time.split(' '); // '오전 10:00' → ['오전', '10:00']
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
            restType: rest,
            category,
        };

        try {
            const response = await axios.post('http://34.236.139.89:8080/api/careCalendar/rest', payload);
            console.log('*-*-*-*-*-*\n Successfully posted data:', response.data);
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
                        careAssignments={careAssignments}
                        selectedProfile={selectedProfile}
                        isCaregiverNotNeeded={isCaregiverNotNeeded}
                        onProfileSelect={(profileId) => {
                            if (!isCaregiverNotNeeded) {
                                setSelectedProfile(profileId);
                                setCareAssignmentId(profileId);
                            }
                        }}
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
                        defaultText={apDate || '일정 일자 선택'} // 기본값으로 날짜 표시
                        onDateChange={(selectedDate) =>
                            apDate((prev) => ({
                                ...prev,
                                date: selectedDate, // 날짜 업데이트
                            }))
                        }
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
                    <TaskPlace
                        location={location}
                        isChecked={isLocationChecked}
                        onToggleCheck={handleToggleLocationCheck}
                    />
                </View>

                <View style={styles.component}>
                    <TaskMemo
                        value={memo}
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
        paddingHorizontal: 16,
    },
    scrollContainer: {
        marginBottom: 20,
    },
    scrollContent: {
        paddingBottom: 80,
    },
    component: {
        marginBottom: 20,
    },
});

export default AddCaregiverRestTask;
