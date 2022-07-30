import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '../types';
import GetStarted from '../screens/getstarted';
import Auth from '../screens/auth';

const AuthNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* get started screen */}
        <Stack.Screen name="GetStarted" component={GetStarted} />
        {/* auth screen */}
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </Stack.Navigator>
  );
};

export default AuthNavigation;
