import React from 'react';
import { View } from 'react-native';
import TimeBlock from '../molecules/TimeBlock';
import mockTasks from '../../datas/MockTasks';

const TimeBlockList = ({ tasks }) => {
  console.log('Tasks:', tasks); // 데이터 확인
  return (
    <View>
      {tasks.map((task) => (
        <TimeBlock key={task.id} task={task} />
      ))}
    </View>
  );
};

export default TimeBlockList;
