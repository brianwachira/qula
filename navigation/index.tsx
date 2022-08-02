import React, {Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './drawerNavigation';
import {navigationRef} from './rootNavigation';
import {useStorage} from '../hooks/useStorage';
import Loading from '../components/shared-ui/loading';
const AuthNavigation = React.lazy(() => import('./authNavigation'));

const MainStackNavigator = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useStorage('email');

  return (
    <NavigationContainer ref={navigationRef}>
      {!user?.email ? (
        <Suspense fallback={<Loading />}>
          <AuthNavigation />
        </Suspense>
      ) : (
        <DrawerNavigator />
      )}
    </NavigationContainer>
  );
};

export default MainStackNavigator;
