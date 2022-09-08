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
  SearchResults: 'SearchResults',
  RestuarantDetails: 'RestuarantDetails',
  FoodDetails: 'FoodDetails',
  EditProfile: 'EditProfile',
  Checkout: 'Checkout',
};

export const routes = [
  {
    name: screens.HomeTab,
    focusedRoute: screens.HomeTab,
    title: 'Home',
    showInTab: false,
    showInDrawer: false,
    icon: (focused: any) => (
      <HomeIcon color={focused ? theme.colors.primary : theme.colors.icon} />
    ),
  },
  {
    name: screens.HomeStack,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: true,
    icon: (focused: any) => (
      <HomeIcon fill={focused ? theme.colors.primary : theme.colors.icon} />
    ),
    iconDrawer: (focused: any) => (
      <HomeIcon fill={focused ? theme.colors.primary : theme.colors.white} />
    ),
  },
  {
    name: screens.Home,
    focusedRoute: screens.HomeStack,
    title: 'Home',
    showInTab: true,
    showInDrawer: false,
    icon: (focused: any) => (
      <HomeIcon fill={focused ? theme.colors.primary : theme.colors.icon} />
    ),
  },
  {
    name: screens.OrdersStack,
    focusedRoute: screens.OrdersStack,
    title: 'Orders',
    showInTab: true,
    showInDrawer: true,
    icon: (focused: any) => (
      <RefreshIcon fill={focused ? theme.colors.primary : theme.colors.icon} />
    ),
    iconDrawer: (focused: any) => (
      <RefreshIcon fill={focused ? theme.colors.primary : theme.colors.white} />
    ),
  },
  {
    name: screens.Orders,
    focusedRoute: screens.OrdersStack,
    title: 'Orders',
    showInTab: true,
    showInDrawer: false,
    icon: (focused: any) => (
      <RefreshIcon fill={focused ? theme.colors.primary : theme.colors.icon} />
    ),
  },
  {
    name: screens.CartStack,
    focusedRoute: screens.CartStack,
    title: 'Cart',
    showInTab: true,
    showInDrawer: true,
    icon: (focused: any) => (
      <CartIcon fill={focused ? theme.colors.primary : theme.colors.icon} />
    ),
    iconDrawer: (focused: any) => (
      <CartIcon fill={focused ? theme.colors.primary : theme.colors.white} />
    ),
  },
  {
    name: screens.Cart,
    focusedRoute: screens.CartStack,
    title: 'Cart',
    showInTab: true,
    showInDrawer: false,
    icon: (focused: any) => (
      <CartIcon fill={focused ? theme.colors.primary : theme.colors.icon} />
    ),
    iconDrawer: (focused: any) => (
      <CartIcon fill={focused ? theme.colors.primary : theme.colors.white} />
    ),
  },
  {
    name: screens.ProfileStack,
    focusedRoute: screens.ProfileStack,
    title: 'Profile',
    showInTab: true,
    showInDrawer: true,
    icon: (focused: any) => (
      <UserCircleIcon
        fill={focused ? theme.colors.primary : theme.colors.icon}
      />
    ),
    iconDrawer: (focused: any) => (
      <UserCircleIcon
        fill={focused ? theme.colors.primary : theme.colors.white}
      />
    ),
  },
  {
    name: screens.Profile,
    focusedRoute: screens.Profile,
    title: 'Profile',
    showInTab: true,
    showInDrawer: false,
    icon: (focused: any) => (
      <UserCircleIcon
        fill={focused ? theme.colors.primary : theme.colors.tab}
      />
    ),
  },
  {
    name: screens.SearchResults,
    focusedRoute: screens.SearchResults,
    title: 'Search Results',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.RestuarantDetails,
    focusedRoute: screens.RestuarantDetails,
    title: 'Restuarant Details',
    showInTab: false,
    showInDrawer: false,
  },
  {
    name: screens.FoodDetails,
    focusedRoute: screens.FoodDetails,
    title: 'Food Details',
    showInTab: false,
    showInDrawer: false,
  },
];
