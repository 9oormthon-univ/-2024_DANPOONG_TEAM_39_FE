const mockTasks = [
  {id: '12', category: '식사', title: '아침     식사', date: '2024-11-24', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '아침     식사', date: '2024-11-25', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '아침     식사', date: '2024-11-26', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '아침     식사', date: '2024-11-27', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '아침     식사', date: '2024-11-28', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '아침     식사', date: '2024-11-29', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '아침     식사', date: '2024-11-30', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},

  {id: '13', category: '식사', title: '점심     식사', date: '2024-11-24', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '13', category: '식사', title: '점심     식사', date: '2024-11-25', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '13', category: '식사', title: '점심     식사', date: '2024-11-26', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '13', category: '식사', title: '점심     식사', date: '2024-11-27', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},

  {id: '13', category: '식사', title: '점심     식사', date: '2024-11-29', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '13', category: '식사', title: '점심     식사', date: '2024-11-30', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},


  {id: '14', category: '식사', title: '저녁     식사', date: '2024-11-24', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '14', category: '식사', title: '저녁     식사', date: '2024-11-25', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},

  {id: '14', category: '식사', title: '저녁     식사', date: '2024-11-27', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '14', category: '식사', title: '저녁     식사', date: '2024-11-28', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '14', category: '식사', title: '저녁     식사', date: '2024-11-29', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '14', category: '식사', title: '저녁     식사', date: '2024-11-30', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},

  {id: '12', category: '휴식', title: '산책', date: '2024-11-29', startTime: '10:00', endTime: '11:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '산책', date: '2024-11-25', startTime: '10:00', endTime: '11:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '산책', date: '2024-11-26', startTime: '10:00', endTime: '11:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '인지     활동', date: '2024-11-27', startTime: '10:00', endTime: '11:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '인지     활동', date: '2024-11-28', startTime: '10:00', endTime: '11:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '인지     활동', date: '2024-11-30', startTime: '10:00', endTime: '11:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},


  {id: '12', category: '휴식', title: '노인정', date: '2024-11-24', startTime: '11:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '노인정', date: '2024-11-25', startTime: '11:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '노인정', date: '2024-11-26', startTime: '11:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '노인정', date: '2024-11-27', startTime: '11:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '노인정', date: '2024-11-28', startTime: '11:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '노인정', date: '2024-11-29', startTime: '11:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '노인정', date: '2024-11-30', startTime: '11:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},


  {id: '12', category: '기타', title: '데이   케어   센터', date: '2024-11-24', startTime: '13:00', endTime: '16:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '기타', title: '병원', date: '2024-11-25', startTime: '13:00', endTime: '16:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '기타', title: '데이   케어   센터', date: '2024-11-26', startTime: '13:00', endTime: '16:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '기타', title: '병원', date: '2024-11-27', startTime: '13:00', endTime: '16:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '기타', title: '데이   케어   센터', date: '2024-11-28', startTime: '13:00', endTime: '16:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '기타', title: '데이   케어   센터', date: '2024-11-29', startTime: '13:00', endTime: '16:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '기타', title: '데이   케어   센터', date: '2024-11-30', startTime: '13:00', endTime: '16:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},

  {id: '12', category: '휴식', title: 'tv 시청', date: '2024-11-29', startTime: '16:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: 'tv 시청', date: '2024-11-25', startTime: '16:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: 'tv 시청', date: '2024-11-26', startTime: '16:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: 'tv 시청', date: '2024-11-27', startTime: '16:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: 'tv 시청', date: '2024-11-28', startTime: '16:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},

  {id: '12', category: '휴식', title: 'tv 시청', date: '2024-11-30', startTime: '16:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},

  {id: '12', category: '휴식', title: '산책', date: '2024-11-29', startTime: '19:00', endTime: '20:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '산책', date: '2024-11-25', startTime: '19:00', endTime: '20:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '산책', date: '2024-11-26', startTime: '19:00', endTime: '20:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '인지       활동', date: '2024-11-27', startTime: '19:00', endTime: '20:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '인지       활동', date: '2024-11-28', startTime: '19:00', endTime: '20:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '휴식', title: '인지       활동', date: '2024-11-30', startTime: '19:00', endTime: '20:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},

  {id: '12', category: '식사', title: '잘 준비하기', date: '2024-11-24', startTime: '20:00', endTime: '21:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '잘 준비하기', date: '2024-11-25', startTime: '20:00', endTime: '21:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '잘 준비하기', date: '2024-11-26', startTime: '20:00', endTime: '21:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '잘 준비하기', date: '2024-11-27', startTime: '20:00', endTime: '21:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '잘 준비하기', date: '2024-11-28', startTime: '20:00', endTime: '21:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '잘 준비하기', date: '2024-11-29', startTime: '20:00', endTime: '21:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},
  {id: '12', category: '식사', title: '잘 준비하기', date: '2024-11-30', startTime: '20:00', endTime: '21:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기'},


];

export default mockTasks;


