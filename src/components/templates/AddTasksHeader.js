import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

const AddTasksHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>돌봄 일정 추가</Text>
      <TouchableOpacity
        onPress={() => 
          navigation.reset({
            index: 0,
            routes: [{ name: 'HomeScreen' }], // HomeScreen으로 이동
          })
        }
        style={styles.iconContainer}
      >
        <Icon name="close" size={24} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.semiBold,
    color: colors.gray900,
    lineHeight: 22,
  },
  iconContainer: {
  },
});

export default AddTasksHeader;
