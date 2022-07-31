import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import BottomNavigation from './bottomNavigation';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={BottomNavigation} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
