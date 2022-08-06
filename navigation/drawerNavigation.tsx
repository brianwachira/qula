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
import {StyleSheet, View} from 'react-native';
import {NavigationContainerRef} from '@react-navigation/native';
import theme from '../styles/themes';
import LogoutIcon from '../assets/icons/logoutIcon';
const Drawer = createDrawerNavigator();

type customDrawerContentProps = {
  nav: () => NavigationContainerRef<ReactNavigation.RootParamList>;
};

const CustomDrawerContent = (
  props: DrawerContentComponentProps & customDrawerContentProps,
) => {
  const currentRouteName = props.nav()?.getCurrentRoute()?.name;

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
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
                <View style={styles.drawerItemContainer}>
                  <View
                    style={[
                      styles.drawerItemIconContainer,
                      focused && styles.marginTop0,
                    ]}>
                    {route?.iconDrawer(focused)}
                  </View>
                  <View style={styles.drawerItemTextContainer}>
                    <Text
                      style={
                        focused ? styles.drawerLabelFocused : styles.drawerLabel
                      }>
                      {route.title}
                    </Text>
                    {!focused && <View style={styles.horizontalDividerStyle} />}
                  </View>
                </View>
              )}
              onPress={() => props.navigation.navigate(route.name)}
              style={[
                styles.drawerItem,
                focused ? styles.drawerItemFocused : null,
              ]}
            />
          );
        })}
      <DrawerItem
        onPress={() => console.log('logout')}
        label={() => (
          <View style={styles.drawerItemContainer}>
            <View style={[styles.drawerItemIconContainer, styles.marginTop0]}>
              <LogoutIcon
                fill={theme.colors.white}
                style={styles.drawerItemIconLogout}
              />
            </View>
            <View>
              <Text style={styles.drawerLabel}>Sign Out</Text>
            </View>
          </View>
        )}
        style={styles.drawerItem}
      />
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
      useLegacyImplementation
      screenOptions={{
        // the drawer screen animated should be slide
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerActiveBackgroundColor: theme.colors.primary,
        drawerActiveTintColor: theme.colors.primary,
        sceneContainerStyle: {backgroundColor: theme.colors.primary},
        headerShown: false,
        drawerStyle: {
          width: '55%',
          marginRight: 0,
        },
      }}
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
  drawerContainer: {
    backgroundColor: theme.colors.primary,
  },
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
  drawerItemIconContainer: {
    flexDirection: 'row',
    marginTop: -20,
  },
  drawerItemTextContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  horizontalDividerStyle: {
    marginTop: 20,
    borderBottomColor: theme.colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    minWidth: '80%',
  },
  // drawer content
  drawerLabel: {
    fontSize: 14,
    color: theme.colors.white,
  },
  drawerLabelFocused: {
    fontSize: 14,
    color: theme.colors.primary,
    fontWeight: '500',
    alignItems: 'center',
  },
  drawerItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItem: {
    height: 50,
    justifyContent: 'center',
  },
  drawerItemFocused: {
    backgroundColor: theme.colors.white,
    marginVertical: 20,
    maxWidth: '80%',
  },
  drawerItemLogout: {},
  drawerItemIconLogout: {
    marginRight: 20,
  },
  marginTop0: {
    marginTop: 0,
  },
});

export default DrawerNavigator;
