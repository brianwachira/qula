import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import {routes, screens} from './routes';
import {View} from 'react-native';
import Orders from '../screens/orders';
import Cart from '../screens/cart';
import {useDrawerProgress} from '@react-navigation/drawer';

import Animated, {Adaptable, Extrapolate} from 'react-native-reanimated';

const Tab = createBottomTabNavigator();

const tabOptions = (props: {route: {name: string}}) => {
  const item = routes.find(routeItem => routeItem.name === props.route.name);

  if (!item?.showInTab) {
    return {
      tabBarButton: () => <View style={{width: 0}} />,
      headerShown: false,
      title: item?.title,
      tabBarStyle: {
        backgroundColor: '#F2F2F2',
        borderTop: 0,
        borderTopWidth: 0,
      },
    };
  }

  return {
    tabBarIcon: (props2: {focused: any}) => item?.icon(props2.focused),
    tabBarLabel: () => null,
    headerShown: false,
    title: item.title,
    tabBarStyle: {
      backgroundColor: '#F2F2F2',
      borderTop: 0,
      borderTopWidth: 0,
      elevation: 0,
      marginBottom: 30,
    },
  };
};

const BottomNavigation = () => {
  const drawerProgress = useDrawerProgress();

  // scaling animation
  const scale = Animated.interpolateNode(drawerProgress as Adaptable<number>, {
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.7, 0.65],
    extrapolate: Extrapolate.CLAMP,
  });

  // border radius animation
  const borderRadius = Animated.interpolateNode(
    drawerProgress as Adaptable<number>,
    {
      inputRange: [0, 1],
      outputRange: [1, 30],
      extrapolate: Extrapolate.CLAMP,
    },
  );

  // offset in the x axis
  const offsetX = Animated.interpolateNode(
    drawerProgress as Adaptable<number>,
    {
      inputRange: [0, 1],
      outputRange: [0, -80],
    },
  );

  // animation styles
  const animatedStyle = {
    borderRadius,
    transform: [
      {
        scale,
      },
      {
        translateX: offsetX,
      },
    ],
  };
  return (
    <Animated.View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flexGrow: 1,
        backgroundColor: '#F2F2F2',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        ...animatedStyle,
      }}>
      <Tab.Navigator screenOptions={tabOptions}>
        <Tab.Screen name={screens.HomeStack} component={Home} />
        <Tab.Screen name={screens.OrdersStack} component={Orders} />
        <Tab.Screen name={screens.CartStack} component={Cart} />
        <Tab.Screen name={screens.ProfileStack} component={Profile} />
      </Tab.Navigator>
    </Animated.View>
  );
};

export default BottomNavigation;
