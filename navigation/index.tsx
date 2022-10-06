// main navigation
import React, {Suspense} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Auth Navigation
const AuthNavigation = React.lazy(() => import('./authNavigation'));

// Create stack.
const Stack = createNativeStackNavigator();

// Import screens.
import BottomTabsNavigator from './bottomTabsNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {screens} from './routes';
import {useStorage} from '../hooks/useStorage';
import {navigationRef} from './rootNavigation';
import Loading from '../components/shared-ui/loading';
import SearchResults from '../screens/searchResults';
import RestuarantDetails from '../screens/restuarantDetails';
import FoodDetails from '../screens/foodDetails';
import OrderDetails from '../screens/orderDetails';
import Checkout from '../screens/checkout';
import EditProfile from '../screens/profile/editProfile';

const MainStackNavigator = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useStorage('user');

  return (
    <NavigationContainer ref={navigationRef}>
      {!user ? (
        <Suspense fallback={<Loading />}>
          <AuthNavigation />
        </Suspense>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name={screens.HomeTab}
            component={BottomTabsNavigator}
          />
          <Stack.Screen
            name={screens.SearchResults}
            component={SearchResults}
          />
          <Stack.Screen
            name={screens.RestuarantDetails}
            component={RestuarantDetails}
          />
          <Stack.Screen name={screens.FoodDetails} component={FoodDetails} />
          <Stack.Screen name={screens.OrderDetails} component={OrderDetails} />
          <Stack.Screen name={screens.Checkout} component={Checkout} />
          <Stack.Screen name={screens.EditProfile} component={EditProfile} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainStackNavigator;
