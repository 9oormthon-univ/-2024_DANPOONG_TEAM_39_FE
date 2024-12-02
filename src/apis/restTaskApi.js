import axios from 'axios';

const API_BASE_URL = 'http://34.236.139.89:8080/api/careCalendar';

// 폼 데이터 가져오기
export const fetchRestForm = async () => {
  const response = await axios.get(`${API_BASE_URL}/rest`);
  return response.data;
};

// 일정 생성
export const createRestTask = async (payload) => {
  const response = await axios.post(`${API_BASE_URL}/rest`, payload);
  return response.data;
};
