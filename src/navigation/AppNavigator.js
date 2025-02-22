import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTimerScreen from '../screens/AddTimerScreen';
import {ScreenNames} from '../data/ScreenNames';
import colors from '../theme/colors';
import HistoryScreen from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName={ScreenNames.HOME_SCREEN}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={ScreenNames.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen
          name={ScreenNames.ADD_TIMER_SCREEN}
          component={AddTimerScreen}
        />
        <Stack.Screen
          name={ScreenNames.HISTORY_SCREEN}
          component={HistoryScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
