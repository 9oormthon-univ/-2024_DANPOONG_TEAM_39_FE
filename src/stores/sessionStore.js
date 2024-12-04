import { create } from 'zustand';

// Zustand Store
const useSessionStore = create((set) => ({
  token: null, // 초기 상태
  setToken: (newToken) => set({ token: newToken }), // 토큰 저장
  clearToken: () => set({ token: null }), // 토큰 삭제
}));

export default useSessionStore;
