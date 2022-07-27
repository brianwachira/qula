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
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import theme from '../../styles/themes';
import {RootStackParamList} from '../../types';

const FirstRoute = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F2F2F2'}}>
      <Text>Login</Text>
    </View>
  );
};

const SecondRoute = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#F2F2F2'}}>
      <Text>Sign Up</Text>
    </View>
  );
};
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const Auth = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'GetStarted'>) => {
  const isDarkMode = useColorScheme() === 'dark';

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);

  const [routes] = React.useState([
    {key: 'first', title: 'Log In'},
    {key: 'second', title: 'Sign Up'},
  ]);
  return (
    <SafeAreaView style={{backgroundColor: '#F2F2F2'}}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={{height: Dimensions.get('screen').height}}>
        <TabView
          navigationState={{index, routes}}
          renderScene={({route}) => {
            switch (route.key) {
              case 'first':
                return <FirstRoute />;
              case 'second':
                return <SecondRoute />;
              default:
                return null;
            }
          }}
          renderTabBar={props => (
            <TabBar
              {...props}
              style={{
                height: Dimensions.get('window').height / 3,
                borderBottomRightRadius: theme.borderRadius.button,
                borderBottomLeftRadius: theme.borderRadius.button,
                backgroundColor: theme.colors.white,
                flex: 0.5,
                justifyContent: 'flex-end',
              }}
              renderLabel={({route}) => (
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    letterSpacing: 0.1,
                    marginVertical: 8,
                    color: theme.colors.black,
                    alignItems: 'flex-end',
                  }}>
                  {route.title}
                </Text>
              )}
              indicatorStyle={{
                backgroundColor: theme.colors.primary,
                width: 100,
                left: (Dimensions.get('window').width / 2 - 100) / 2,
                height: 3,
              }}
            />
          )}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
        />
        <Image
          source={require('../../assets/Group3.png')}
          style={{
            position: 'absolute',
            top: 100,
            left: Dimensions.get('screen').width / 2 ,
            right: Dimensions.get('screen').width / 2 ,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Auth;
