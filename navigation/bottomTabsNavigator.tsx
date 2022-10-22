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
import FocusAwareStatusBar from '../components/shared-ui/focusAwareStatusBar';

const BottomTabsNavigator = () => {
  return (
    <>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor={theme.colors.tab}
      />
      <Tab.Navigator
        screenOptions={({}) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveColor: theme.colors.tab,
          tabBarStyle: styles.tabStyleWithContent,
          tabBarLabelStyle: {
            ...theme.fontSizes.label.small,
          },
        })}>
        <Tab.Screen
          name={screens.Home}
          component={Home}
          options={{
            unmountOnBlur: true,
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
            unmountOnBlur: true,
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
            unmountOnBlur: true,
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
    </>
  );
};

const styles = StyleSheet.create({
  tabStyleWithContent: {
    backgroundColor: theme.colors.tab,
    paddingBottom: 5,
    alignItems: 'center',
    flex: 0.07,
  },
});
export default BottomTabsNavigator;
