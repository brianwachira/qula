import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Create bottom navigator.
const Tab = createBottomTabNavigator();

// Import screens.
import Home from '../screens/home';
import Orders from '../screens/orders';
import Cart from '../screens/cart';
import Profile from '../screens/profile';
import theme from '../styles/themes';
import HomeIcon from '../assets/icons/homeIcon';
import {screens} from './routes';
import RefreshIcon from '../assets/icons/refreshIcon';
import CartIcon from '../assets/icons/cartIcon';
import UserCircleIcon from '../assets/icons/userCircleIcon';
import {StyleSheet} from 'react-native';

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveColor: theme.colors.tab,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          marginTop: 35,
          fonstSize: theme.fontSizes.label.normal.fontSize,
          lineHeight: theme.fontSizes.label.normal.lineHeight,
        },
        headerTransparent: true,
        tabBarStyle: styles.tabStyleWithContent,
        lazy: false,
        tabBarLabelStyle: {
          ...theme.fontSizes.label.small,
        },
      })}>
      <Tab.Screen
        name={screens.Home}
        component={Home}
        options={{
          tabBarIcon: (props: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <HomeIcon
              fill={props.focused ? theme.colors.primary : theme.colors.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Orders}
        component={Orders}
        options={{
          tabBarIcon: (props: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <RefreshIcon
              fill={props.focused ? theme.colors.primary : theme.colors.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Cart}
        component={Cart}
        options={{
          tabBarIcon: (props: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <CartIcon
              fill={props.focused ? theme.colors.primary : theme.colors.icon}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Profile}
        component={Profile}
        options={{
          tabBarIcon: (props: {
            focused: boolean;
            color: string;
            size: number;
          }) => (
            <UserCircleIcon
              fill={props.focused ? theme.colors.primary : theme.colors.icon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabStyleWithContent: {
    backgroundColor: theme.colors.tab,
    borderTop: 0,
    borderTopWidth: 0,
    elevation: 0,
    paddingVertical: 0,
    marginVertical: 5,
    alignItems: 'center',
    flex: 0.07,
  },
});
export default BottomTabsNavigator;
