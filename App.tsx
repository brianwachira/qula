import 'react-native-gesture-handler';
import React from 'react';
import MainStackNavigator from './navigation';
import * as Sentry from '@sentry/react-native';
import {SENTRY_DSN} from '@env';

Sentry.init({
  dsn: SENTRY_DSN,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
  // We recommend adjusting this value in production.
  tracesSampleRate: 1.0,
});
const App = () => {
  return <MainStackNavigator />;
};

export default Sentry.wrap(App);
