import {useDrawerStatus} from '@react-navigation/drawer';
import {useIsFocused} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StatusBar, StyleSheet, View, StatusBarProps} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Text from '../components/shared-ui/text';
import theme from '../styles/themes';
import {RootStackParamList} from '../types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const FocusAwareStatusBar = (
  props: JSX.IntrinsicAttributes &
    JSX.IntrinsicClassAttributes<StatusBar> &
    Readonly<StatusBarProps>,
) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  const drawerStatus = useDrawerStatus();
  return (
    <SafeAreaView style={{height: '100%', marginVertical: 40}}>
      <FocusAwareStatusBar
        barStyle={drawerStatus === 'open' ? 'light-content' : 'dark-content'}
        backgroundColor={
          drawerStatus === 'open' ? theme.colors.primary : theme.colors.tab
        }
      />
      <View style={styles.container}>
        <Text>Home</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
