import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './drawerNavigation';
import {navigationRef} from './rootNavigation';
import AuthNavigation from './authNavigation';

const MainStackNavigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      {/* <AuthNavigation /> */}
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default MainStackNavigator;
