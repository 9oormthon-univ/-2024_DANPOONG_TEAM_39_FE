import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import colors from '../../styles/colors';
import textStyles from '../../styles/textStyles';
import CloseIcon from '../../assets/images/modal_close.svg';
import PhoneIcon from '../../assets/images/modal_phone.svg';
import LocationIcon from '../../assets/images/daily_map.svg';
import FloatingButton1 from "./FloatingButton1";
import FloatingButton from "./FloatingButton";
import CaregiverFloatingButton from "./CaregiverFloatingButton";

const Popup = ({ onClose, date, time, endTime }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(true);
  const [rawData, setRawData] = useState("");  // Store rawData

  useEffect(() => {
    console.log("Popup props: ", { date, time, endTime });
    fetchRecommendation(date, time, endTime);
  }, [date, time, endTime]);

  const fetchRecommendation = async (date, time, endTime) => {
    try {
      const response = await fetch(
          `http://34.236.139.89:8080/api/recommendation/1?date=${date}&startTime=${time}&endTime=${endTime}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
      );

      if (!response.ok) {
        throw new Error(`Network response error: ${response.status} ${response.statusText}`);
      }

      const rawData = await response.text();
      console.log('Raw Response:', rawData);

      let jsonData;
      try {
        const jsonString = rawData.match(/(\{.*\})/);
        if (jsonString && jsonString[0]) {
          jsonData = JSON.parse(jsonString[0]);
          console.log('Parsed JSON:', jsonData);
          setRecommendation(jsonData);
        } else {
          throw new Error('Invalid JSON format in the response');
        }
      } catch (parseError) {
        console.error('JSON Parsing Error:', parseError.message);
        throw new Error('Invalid JSON format in the response');
      }

      setRawData(rawData);
    } catch (err) {
      console.error('Fetch Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getSubCategory = (categoryName) => {
    return categoryName ? categoryName.split(" > ").pop() : '';
  };

  const handleCallClick = () => {
    if (recommendation && recommendation.phone) {
      const phoneNumber = `tel:${recommendation.phone}`;
      Linking.openURL(phoneNumber).catch((err) => console.error("Failed to open URL:", err));
    }
  };

  const handleDetailClick = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  // Check if the rawData contains the text indicating no caregiver available
  const isNoCaregiverAvailable = rawData.includes("돌보미가 없습니다");

  return (
      <Modal
          transparent={true}
          visible={visible}
          animationType="fade"
          onRequestClose={() => { setVisible(false); onClose(); }}
      >
        <View style={styles.overlay}>
          <Text style={styles.topText}>
            {isNoCaregiverAvailable ? "가능한 돌보미가 없어요." : ""}
          </Text>
          <View style={styles.modalBox}>
            <View style={styles.topSection}>
              <Text style={styles.titleText}>
                집 근처 <Text style={styles.highlightText}>{recommendation ? getSubCategory(recommendation.category_name) : ''}</Text>를 추천할게요
              </Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => { setVisible(false); onClose(); }}>
                <CloseIcon width={24} height={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.contentSection}>
              <View style={styles.textContainer}>
                {loading ? (
                    <Text>가까운 서비스를 찾고있어요...</Text>
                ) : error ? (
                    <Text>오류 발생: {error}</Text>
                ) : recommendation ? (
                    <>
                      <Text style={styles.centerTitle}>{recommendation.place_name}</Text>
                      <TouchableOpacity onPress={() => handleDetailClick(recommendation.place_url)}>
                        <Text style={styles.detailText}>자세히 보기</Text>
                      </TouchableOpacity>
                      <View style={styles.locationContainer}>
                        <LocationIcon width={16} height={16} />
                        <Text style={styles.locationText}>자택으로부터 <Text style={styles.detailText}>{recommendation.distance}m</Text></Text>
                      </View>
                    </>
                ) : (
                    <Text>추천 정보가 없습니다.</Text>
                )}
              </View>
              <Image
                  source={require('../../assets/images/img_popup.png')}
                  style={styles.image}
                  resizeMode="cover"
              />
            </View>

            <View style={styles.bottomSection}>
              <TouchableOpacity style={styles.contactButton} onPress={handleCallClick}>
                <PhoneIcon width={20} height={20} style={styles.phoneIcon} />
                <Text style={styles.contactText}>전화로 문의하기</Text>
              </TouchableOpacity>
            </View>
          </View>
          <CaregiverFloatingButton
              date={date}
              time={time}
              endTime={endTime}
          />
          {/* Only show this if there is no caregiver available */}
          {isNoCaregiverAvailable && (
              <>
                <Text style={styles.bottomText}>내 일정 확인하기 {'>'} </Text>
                <Text style={styles.floatText}>{recommendation ? getSubCategory(recommendation.category_name) : ''}</Text>
                <Text style={styles.floatText1}>일정 추가하기</Text>
                <FloatingButton1
                    categoryName={recommendation ? getSubCategory(recommendation.category_name) : ''}
                    date={date}
                    time={time}
                    endTime={endTime}
                />
              </>
          )}
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    width: 328,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: colors.gray050,
  },
  topSection: {
    height: 64,
    backgroundColor: colors.white000,
    justifyContent: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  titleText: {
    ...textStyles.title16SemiBold,
    color: colors.gray900,
  },
  highlightText: {
    color: colors.primary001,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  contentSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.white000,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  centerTitle: {
    ...textStyles.title16SemiBold,
    color: colors.gray900,
    marginBottom: 8,
  },
  detailText: {
    ...textStyles.subtitle12Medium14,
    color: colors.primary001,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...textStyles.caption11Medium,
    color: colors.gray900,
    marginLeft: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginLeft: 16,
  },
  bottomSection: {
    height: 52,
    backgroundColor: colors.primary001,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeText: {
    ...textStyles.title16SemiBold,
    color: colors.white000,
    marginBottom: 8,
  },
  phoneIcon: {
    marginRight: 8,
  },
  contactText: {
    ...textStyles.title16SemiBold,
    color: colors.white000,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topText: {
    marginBottom: 12,
    ...textStyles.title18SemiBold,
    color: colors.white000,
  },
  bottomText: {
    marginTop: 12,
    ...textStyles.title14Bold,
    color: colors.gray050,
  },
  floatText: {
    position: 'absolute',
    bottom: 60,
    right: 96,
    ...textStyles.title16SemiBold,
    color: colors.primary001,
  },
  floatText1: {
    position: 'absolute',
    bottom: 40,
    right: 96,
    ...textStyles.title16SemiBold,
    color: colors.white000,
  },

});

export default Popup;
