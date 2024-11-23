import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

import CategoryPicker from '../components/atoms/CategoryPicker';
import MedicationTypeButton from '../components/atoms/MedicationTypeButton'; // 복약 종류 추가 버튼 컴포넌트
import CaregiverSelectionRow from '../components/molecules/CaregiverSelectionRow';
import TaskNameInput from '../components/molecules/TaskNameInput';
import TaskDatePickerButton from '../components/atoms/TaskDatePickerButton';
import TimePicker from '../components/atoms/TimePicker';
import StartTimeEndTime from '../components/molecules/StartTimeEndTime';
import TaskIsAlarmed from '../components/molecules/TaskIsAlarmed';
import TaskRepeat from '../components/atoms/TaskRepeat';

const AddPillTask = ({ route }) => {
    const [selectedCategory, setSelectedCategory] = useState(route.params?.selectedCategory || null);
    const [name, setName] = useState(route.params?.familyName || '김수한무'); // 사용자 이름가져오기
    const [startSleepTime, setStartSleepTime] = useState('09:00'); // 초기값
    const [endSleepTime, setEndSleepTime] = useState('20:00'); // 초기값

    const handleAddType = (type) => {
        console.log('Added Medication Type:', type);
    };

    const handleDeleteType = (type) => {
        console.log('Deleted Medication Type:', type);
    };

    const handleTimeChange = ({ startTime, endTime }) => {
        if (startTime !== undefined) setStartSleepTime(startTime);
        if (endTime !== undefined) setEndSleepTime(endTime);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={styles.scrollContainer}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* 카테고리 선택 컴포넌트 */}
                <CategoryPicker
                    selectedCategory={selectedCategory}
                    onSelectCategory={(category) => setSelectedCategory(category)}
                />

                {/* 돌보미 가족 선택 컴포넌트 */}
                <CaregiverSelectionRow
                    label="돌보미 가족"
                    initialValue={name}
                    onValueChange={(value) => {}}
                />

                {/* 복약 종류 추가 버튼 */}
                <MedicationTypeButton
                    onAddType={handleAddType}
                    onDeleteType={handleDeleteType}
                />

                {/* 일정명 입력 */}
                <TaskNameInput />

                {/* 일정 날짜 선택 */}
                <TaskDatePickerButton defaultText="일정 일자 선택" />

                {/* 시작 시간 선택 */}
                <TimePicker
                    placeholder="시작 시간"
                    onTimeChange={(time) => {}}
                />

                {/* 시작 시간 ~ 종료 시간 */}
                <StartTimeEndTime />

                {/* 알림 설정 */}
                <TaskIsAlarmed />

                {/* 반복 설정 */}
                <TaskRepeat />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.gray050, // 배경색
    },
    scrollContainer: {
        flex: 1,
        width: '100%', // 화면 전체 너비 사용
    },
    scrollContent: {
        padding: 16, // 내부 여백
        //alignItems: 'center', // 가운데 정렬
    },
});

export default AddPillTask;
