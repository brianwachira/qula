import React from 'react';
import CartIcon from '../assets/icons/cartIcon';
import HomeIcon from '../assets/icons/homeIcon';
import RefreshIcon from '../assets/icons/refreshIcon';
import UserCircleIcon from '../assets/icons/userCircleIcon';
import theme from '../styles/themes';

export const screens = {
  HomeTab: 'HomeTab',
  HomeStack: 'HomeStack',
  Home: 'Home',
  OrdersStack: 'OrdersStack',
  Orders: 'Orders',
  CartStack: 'CartStack',
  Cart: 'Cart',
  ProfileStack: 'ProfileStack',
  Profile: 'Profile',
};

export const routes = [
  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: 'Home',
    showInTab: false,
    showInDrawer: false,
    icon: (focused: any) => (
      <HomeIcon color={focused ? theme.colors.primary : '#000'} />
    ),
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: true,
    icon: (focused: any) => (
      <HomeIcon fill={focused ? theme.colors.primary : '#000'} />
    ),
  },
  {
    name: screens.Home,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: false,
    icon: (focused: any) => (
      <HomeIcon fill={focused ? theme.colors.primary : '#000'} />
    ),
  },
  {
    name: screens.OrdersStack,
    focusedRoute: screens.OrdersStack,
    title: 'Orders',
    showInTab: true,
    showInDrawer: true,
    icon: (focused: any) => (
      <RefreshIcon fill={focused ? theme.colors.primary : '#000'} />
    ),
  },
  {
    name: screens.Orders,
    focusedRoute: screens.OrdersStack,
    title: 'Orders',
    showInTab: true,
    showInDrawer: false,
    icon: (focused: any) => (
      <RefreshIcon fill={focused ? theme.colors.primary : '#000'} />
    ),
  },
  {
    name: screens.CartStack,
    focusedRoute: screens.OrdersStack,
    title: 'Cart',
    showInTab: true,
    showInDrawer: true,
    icon: (focused: any) => <CartIcon />,
  },
  {
    name: screens.Cart,
    focusedRoute: screens.OrdersStack,
    title: 'Cart',
    showInTab: true,
    showInDrawer: false,
    icon: (focused: any) => <CartIcon />,
  },
  {
    name: screens.ProfileStack,
    focusedRoute: screens.ProfileStack,
    title: 'Profile',
    showInTab: true,
    showInDrawer: true,
    icon: (focused: any) => <UserCircleIcon />,
  },
  {
    name: screens.Profile,
    focusedRoute: screens.Profile,
    title: 'Profile',
    showInTab: true,
    showInDrawer: false,
    icon: (focused: any) => <UserCircleIcon />,
  },
];
