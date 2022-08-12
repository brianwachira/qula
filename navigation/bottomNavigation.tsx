import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home';
import Profile from '../screens/profile';
import {routes, screens} from './routes';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Orders from '../screens/orders';
import Cart from '../screens/cart';
import {useDrawerProgress, useDrawerStatus} from '@react-navigation/drawer';

import Animated, {Adaptable, Extrapolate} from 'react-native-reanimated';
import theme from '../styles/themes';
import FocusAwareStatusBar from '../components/shared-ui/focusAwareStatusBar';
import MenuIcon from '../assets/icons/menuIcon';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import CloseIcon from '../assets/icons/closeIcon';
import SearchResults from '../screens/searchResults';
import TextInput from '../components/shared-ui/textInput';
import RestuarantDetails from '../screens/restuarantDetails';

const styles = StyleSheet.create({
  tabNone: {
    width: 0,
  },
  tabStyleEmpty: {
    backgroundColor: theme.colors.tab,
    borderTop: 0,
    borderTopWidth: 0,
  },
  tabStyleWithContent: {
    backgroundColor: theme.colors.tab,
    borderTop: 0,
    borderTopWidth: 0,
    elevation: 0,
    paddingVertical: 0,
    marginVertical: 0,
    alignItems: 'center',
    flex: 0.07,
  },
  transitionContainerStyle: {
    flex: 1,
    flexGrow: 1,
  },
  transparentCardStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.tab,
    opacity: 0.3,
    borderRadius: 30,
    flexGrow: 1,
  },
  ScreenContentStyle: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.colors.tab,
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  menuIconStyle: {
    marginLeft: 35,
    marginTop: 35,
  },
});

const Tab = createBottomTabNavigator();

const tabOptions = (props: {
  route: RouteProp<ParamListBase, string>;
  navigation: any;
}) => {
  const item = routes.find(routeItem => routeItem.name === props.route.name);

  if (!item?.showInTab) {
    return {
      tabBarButton: () => <View style={styles.tabNone} />,
      headerShown: false,
      title: item?.title === 'Home' ? null : item?.title,
      tabBarStyle: styles.tabStyleEmpty,
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const drawerStatus = useDrawerStatus();

  return {
    tabBarIcon: (props2: {focused: any}) => item?.icon(props2.focused),
    tabBarLabel: () => null,
    title: item?.title === 'Home' ? null : item?.title,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      marginTop: 35,
      fonstSize: theme.fontSizes.label.normal.fontSize,
      lineHeight: theme.fontSizes.label.normal.lineHeight,
    },
    headerTransparent: true,
    tabBarStyle: styles.tabStyleWithContent,
    // menu icon
    headerLeft: () => (
      <TouchableOpacity
        style={styles.menuIconStyle}
        onPress={() => props.navigation.toggleDrawer()}>
        {drawerStatus === 'closed' ? <MenuIcon /> : <CloseIcon />}
      </TouchableOpacity>
    ),
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

  // transparent card
  const translateTransparentCard = Animated.interpolateNode(
    drawerProgress as Adaptable<number>,
    {
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, -50],
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

  const drawerStatus = useDrawerStatus();
  return (
    <>
      <FocusAwareStatusBar
        animated
        showHideTransition={'slide'}
        backgroundColor={
          drawerStatus === 'open' ? theme.colors.primary : theme.colors.tab
        }
        barStyle={drawerStatus === 'open' ? 'light-content' : 'dark-content'}
      />
      <Animated.View style={[styles.transitionContainerStyle, animatedStyle]}>
        <Animated.View
          style={[
            styles.transparentCardStyle,
            {
              transform: [
                {
                  translateX: translateTransparentCard,
                },
                {scale: 0.9},
              ],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.ScreenContentStyle,
            {
              borderRadius: borderRadius,
            },
          ]}>
          <Tab.Navigator screenOptions={tabOptions}>
            <Tab.Screen name={screens.HomeStack} component={Home} />
            <Tab.Screen name={screens.OrdersStack} component={Orders} />
            <Tab.Screen name={screens.CartStack} component={Cart} />
            <Tab.Screen name={screens.ProfileStack} component={Profile} />
            <Tab.Screen
              name={screens.SearchResults}
              component={SearchResults}
              options={({navigation}) => ({
                headerTitle: () => <TextInput value={navigation.title} />,
                headerBackVisible: true,
              })}
            />
            <Tab.Screen
              name={screens.RestuarantDetails}
              component={RestuarantDetails} />
          </Tab.Navigator>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default BottomNavigation;
