import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const LoadTaskScreen = ({ route }) => {
  const navigation = useNavigation();
  const { taskId } = route.params; // 전달받은 일정 ID

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://34.236.139.89:8080/api/careCalendar/${taskId}`);
        const taskData = response.data;

        // category에 따라 스크린 이동
        switch (taskData.category) {
          case 'rest':
            navigation.replace('AddRestTask', { taskData });
            break;
          case 'meal':
            navigation.replace('AddMealTask', { taskData });
            break;
          case 'hospital':
            navigation.replace('AddHospitalTask', { taskData });
            break;
          default:
            console.error('Unknown category:', taskData.category);
            break;
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId, navigation]);

  return null; // 데이터 로드 및 라우팅 중에는 화면 표시 없음
};

export default LoadTaskScreen;
