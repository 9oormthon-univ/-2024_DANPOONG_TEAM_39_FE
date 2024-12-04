import React, { useState, useEffect } from 'react';

const Profiles = () => {
  const [profiles, setProfiles] = useState([
    { id: 1, name: '할머니', imagePath: require('../assets/images/profile.png') },
  ]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('http://34.236.139.89:8080/api/careCalendar/dolbomiList');
        const data = await response.json();

        const newProfiles = data.map((profile) => ({
          id: profile.id,
          name: profile.member.alias || 'Unknown',
          imagePath: require('../assets/images/profile_me.png'), // 고정 이미지 경로
        }));

        setProfiles((prevProfiles) => [...prevProfiles, ...newProfiles]); // 기존 프로필에 추가
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchProfiles();
  }, []);

  return profiles; // 또는 컴포넌트에서 사용하는 방식에 맞게 내보내기
};

export default Profiles;
