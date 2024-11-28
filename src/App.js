import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens'; // react-native-screens 활성화
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

import AddTasksHeader from './components/templates/AddTasksHeader'; // 커스텀 헤더
import AddPillTask from './screens/AddPillTask'; 
import AddMealTask from './screens/AddMealTask';
import AddHospitalTask from './screens/AddHospitalTask'; 
import AddRestTask from './screens/AddRestTask'; 
import AddOthersTask from './screens/AddOthersTask'; 
import AddMyCalendar from './screens/AddMyCalendar';
enableScreens(); // react-native-screens 초기화

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        {/* 기존 화면 */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />

        {/* 일정 추가 화면 */}
        <Stack.Screen 
          name="AddPillTask" 
          component={AddPillTask}
          options={{
            header: () => <AddTasksHeader />, 
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="AddMealTask" 
          component={AddMealTask} 
          options={{
            header: () => <AddTasksHeader />, 
            presentation: 'modal', 
          }} 
        />
        <Stack.Screen 
          name="AddHospitalTask" 
          component={AddHospitalTask} 
          options={{
            header: () => <AddTasksHeader />, 
            presentation: 'modal', 
          }} 
        />
        <Stack.Screen 
          name="AddRestTask" 
          component={AddRestTask} 
          options={{
            header: () => <AddTasksHeader />,
            presentation: 'modal', 
          }} 
        />
        <Stack.Screen 
          name="AddOthersTask" 
          component={AddOthersTask} 
          options={{
            header: () => <AddTasksHeader />, 
            presentation: 'modal', 
          }} 
        />
        <Stack.Screen 
          name="AddMyCalendar" 
          component={AddMyCalendar} 
          options={{
            header: () => <AddTasksHeader />, 
            presentation: 'modal', 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
