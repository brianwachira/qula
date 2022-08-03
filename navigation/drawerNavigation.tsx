import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import BottomNavigation from './bottomNavigation';
import {routes, screens} from './routes';
import Text from '../components/shared-ui/text';
import {StyleSheet} from 'react-native';
import {NavigationContainerRef} from '@react-navigation/native';
const Drawer = createDrawerNavigator();

type customDrawerContentProps = {
  nav: () => NavigationContainerRef<ReactNavigation.RootParamList>;
};

const CustomDrawerContent = (
  props: DrawerContentComponentProps & customDrawerContentProps,
) => {
  const currentRouteName = props.nav()?.getCurrentRoute()?.name;
  return (
    <DrawerContentScrollView {...props}>
      {routes
        .filter(route => route.showInDrawer)
        .map(route => {
          const focusedRoute = routes.find(r => r.name === currentRouteName);
          const focused = focusedRoute
            ? route.name === focusedRoute?.focusedRoute
            : route.name === screens.HomeStack;
          return (
            <DrawerItem
              key={route.name}
              label={() => (
                <Text
                  style={
                    focused ? styles.drawerLabelFocused : styles.drawerLabel
                  }>
                  {route.title}
                </Text>
              )}
              onPress={() => props.navigation.navigate(route.name)}
              style={[
                styles.drawerItem,
                focused ? styles.drawerItemFocused : null,
              ]}
            />
          );
        })}
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({
  nav,
}: {
  nav: () => NavigationContainerRef<ReactNavigation.RootParamList>;
}) => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} nav={nav} />}>
      <Drawer.Screen
        name={screens.HomeTab}
        options={{title: 'Home'}}
        component={BottomNavigation}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  headerRight: {
    marginRight: 15,
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: '#551E18',
    fontWeight: '500',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center',
  },
  drawerItemFocused: {
    backgroundColor: '#ba9490',
  },
});

export default DrawerNavigator;
