import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
  useWindowDimensions,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import theme from '../../styles/themes';
import {RootStackParamList} from '../../types';
import Login from './login';
import Signup from './signup';

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: theme.colors.tab,
  },
  tabBarStyle: {
    height: Dimensions.get('window').height / 3,
    borderBottomRightRadius: theme.borderRadius.button,
    borderBottomLeftRadius: theme.borderRadius.button,
    backgroundColor: theme.colors.white,
    flex: 0.5,
    justifyContent: 'flex-end',
  },
  tabBarLabel: {
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.1,
    marginVertical: 8,
    color: theme.colors.black,
    alignItems: 'flex-end',
  },
  tabBarIndicatorStyle: {
    backgroundColor: theme.colors.primary,
    width: 100,
    left: (Dimensions.get('window').width / 2 - 100) / 2,
    height: 3,
  },
  logo: {
    position: 'absolute',
    top: Dimensions.get('window').height / 4 / 2,
    alignSelf: 'center',
  },
});

const Auth = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'GetStarted'>) => {
  const isDarkMode = useColorScheme() === 'dark';

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    {key: 'login', title: 'Log In'},
    {key: 'signup', title: 'Sign Up'},
  ]);
  return (
    <SafeAreaView style={styles.tabContainer}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{height: Dimensions.get('screen').height}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'login':
                return <Login />;
              case 'signup':
                return <Signup />;
              default:
                return null;
            }
          }}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={styles.tabBarStyle}
              renderLabel={({route}) => (
                <Text style={styles.tabBarLabel}>{route.title}</Text>
              )}
              indicatorStyle={styles.tabBarIndicatorStyle}
            />
          )}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
        <Image
          source={require('../../assets/Group3.png')}
          style={styles.logo}
        />
      </View>
    </SafeAreaView>
  );
};

export default Auth;
