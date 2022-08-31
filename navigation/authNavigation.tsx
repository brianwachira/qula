import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types/types';
import GetStarted from '../screens/getstarted';
import Auth from '../screens/auth';
import Otp from '../screens/auth/otp';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* get started screen */}
      <Stack.Screen name="GetStarted" component={GetStarted} />
      {/* auth screen */}
      <Stack.Screen name="Auth" component={Auth} />
      {/* otp screen */}
      <Stack.Screen name="Otp" component={Otp} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
