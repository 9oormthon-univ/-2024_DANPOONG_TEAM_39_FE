import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Axios 인스턴스 설정
const apiClient = axios.create({
  baseURL: 'http://34.236.139.89:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// MockTasks 컴포넌트
const useMockTasks = () => {
  const [mockTasks, setMockTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await apiClient.get('/careCalendar/all');
        // API 데이터를 변환하여 상태에 저장
        const tasks = response.data.map((task) => ({
          id: String(task.id),
          category: task.category || 'others',
          title: task.title || 'No Title',
          date: task.date || '2024-12-01',
          startTime: task.startTime.slice(0, 5) || '00:00',
          endTime: task.endTime.slice(0, 5) || '00:00',
          isAlarm: task.isAlarm || false,
          hasRecommendation: task.hasRecommendation || false,
          isShared: task.isShared || false,
          location: task.location || 'No Location',
        }));
        setMockTasks(tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []); // 의존성 배열에 빈 배열을 넣어 컴포넌트 마운트 시 한 번만 실행

  return mockTasks;
};

export default useMockTasks;
