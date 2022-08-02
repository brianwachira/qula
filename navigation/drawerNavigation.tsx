import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomNavigation from './bottomNavigation';
import Profile from '../screens/profile';
import History from '../screens/history';
import Liked from '../screens/liked';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="HomeTabs"
        options={{title: 'Home'}}
        component={BottomNavigation}
      />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="History" component={History} />
      <Drawer.Screen name="Liked" component={Liked} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
