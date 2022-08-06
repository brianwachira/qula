import React, {useEffect, useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import {routes, screens} from './routes';
import {Animated, View} from 'react-native';
import Orders from '../screens/orders';
import Cart from '../screens/cart';
import {useDrawerStatus} from '@react-navigation/drawer';
import theme from '../styles/themes';

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
  //const drawerProgress = useDrawerProgress();

  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;

  const drawerStatus = useDrawerStatus();

  useEffect(() => {
    // scaling the view
    Animated.timing(scaleValue, {
      toValue: drawerStatus === 'open' ? 0.7 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(offsetValue, {
      // Your Random Value...
      toValue: drawerStatus === 'open' ? -70 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(closeButtonOffset, {
      // YOur Random Value...
      toValue: drawerStatus === 'open' ? 0 : -30,
      duration: 150,
      useNativeDriver: true,
    }).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [drawerStatus]);

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
        borderRadius: drawerStatus === 'open' ? 30 : 0,
        borderTopLeftRadius: 30,
        // transforming view
        transform: [{scale: scaleValue}, {translateX: offsetValue}],
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
