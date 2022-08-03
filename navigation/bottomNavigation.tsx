import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import {routes, screens} from './routes';
import {View} from 'react-native';
import Text from '../components/shared-ui/text';
import Orders from '../screens/orders';
import Cart from '../screens/cart';

const Tab = createBottomTabNavigator();

const tabOptions = (props: {route: {name: string}}) => {
  const item = routes.find(routeItem => routeItem.name === props.route.name);

  if (!item?.showInTab) {
    return {
      tabBarButton: () => <View style={{width: 0}} />,
      headerShown: false,
      title: item?.title,
    };
  }

  return {
    tabBarIcon: (props2: {focused: any}) => item?.icon(props2.focused),
    tabBarLabel: () => <Text>{item.title || ''}</Text>,
    headerShown: false,
    title: item.title,
  };
};

const BottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={tabOptions}>
      <Tab.Screen name={screens.HomeStack} component={Home} />
      <Tab.Screen name={screens.OrdersStack} component={Orders} />
      <Tab.Screen name={screens.CartStack} component={Cart} />
      <Tab.Screen name={screens.ProfileStack} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
