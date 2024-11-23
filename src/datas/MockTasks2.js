const mockTasks = [
  {id: '12', category: '식사', title: '아침    식사', date: '2024-11-24', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '아침    식사', date: '2024-11-25', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '아침    식사', date: '2024-11-26', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '아침    식사', date: '2024-11-27', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '아침    식사', date: '2024-11-28', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '아침    식사', date: '2024-11-29', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '아침    식사', date: '2024-11-30', startTime: '09:00', endTime: '10:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},

  {id: '12', category: '식사', title: '점심    식사', date: '2024-11-24', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '점심    식사', date: '2024-11-25', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '점심    식사', date: '2024-11-26', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '점심    식사', date: '2024-11-27', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '점심    식사', date: '2024-11-28', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '점심    식사', date: '2024-11-29', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '점심    식사', date: '2024-11-30', startTime: '12:00', endTime: '13:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},

  {id: '12', category: '식사', title: '저녁    식사', date: '2024-11-24', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '저녁    식사', date: '2024-11-25', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '저녁    식사', date: '2024-11-26', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '저녁    식사', date: '2024-11-27', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '저녁    식사', date: '2024-11-28', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '저녁    식사', date: '2024-11-29', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '식사', title: '저녁    식사', date: '2024-11-30', startTime: '18:00', endTime: '19:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},

  {id: '12', category: '내 일정', title: '편의점 알바', date: '2024-11-24', startTime: '10:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '내 일정', title: '편의점 알바', date: '2024-11-25', startTime: '10:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '내 일정', title: '편의점 알바', date: '2024-11-26', startTime: '10:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '내 일정', title: '편의점 알바', date: '2024-11-27', startTime: '10:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '내 일정', title: '편의점 알바', date: '2024-11-28', startTime: '10:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '내 일정', title: '편의점 알바', date: '2024-11-29', startTime: '10:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '내 일정', title: '편의점 알바', date: '2024-11-30', startTime: '10:00', endTime: '12:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},

  {id: '12', category: '내 일정', title: '카페    알바', date: '2024-11-25', startTime: '13:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '내 일정', title: '카페    알바', date: '2024-11-28', startTime: '13:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},
  {id: '12', category: '내 일정', title: '카페    알바', date: '2024-11-29', startTime: '13:00', endTime: '18:00', isAllDay: false, repeat: 'daily', isAlarmOn: true, location: '동네 공원', memo: '간단한 스트레칭과 달리기',},

];

export default mockTasks;
