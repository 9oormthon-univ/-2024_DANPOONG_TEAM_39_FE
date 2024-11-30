import axios from 'axios';

// Base URL 설정 (필요하면 .env에서 관리)
const BASE_URL = '/api/careCalendar';

// 특정 id 돌봄 일정 1개 조회, 수정, 삭제
export const fetchCareCalendarById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching care calendar with ID ${id}:`, error);
    throw error;
  }
};

// 돌봄 일정 조회 (GET)
export const getCareTask = async (category, queryParams) => {
    const url = `/api/careCalendar/${category}`;
    try {
      const response = await axios.get(url, {
        params: queryParams, // 쿼리 파라미터
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching tasks for category ${category}:`, error);
      throw error;
    }
  };
  
// 카테고리별 일정 추가
export const PostTask = async (category, taskData) => {
    const url = `/api/careCalendar/${category}`;
    try {
      const response = await axios.post(url, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error adding task for category ${category}:`, error);
      throw error;
    }
  };
  