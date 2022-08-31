import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Button from '../components/shared-ui/button';
import theme from '../styles/themes';
import {RootStackParamList} from '../types/types';

const styles = StyleSheet.create({
  sectionLogo: {
    marginVertical: 30,
    flexDirection: 'row',
    marginHorizontal: 50,
    flex: 0.3,
  },
  logo: {
    flex: 0.25,
    height: undefined,
    width: undefined,
  },
  content: {
    fontStyle: 'normal',
    fontSize: 65,
    fontWeight: '800',
    lineHeight: 80,
    marginHorizontal: 50,
    color: theme.colors.white,
  },
  images: {
    // marginBottom: Dimensions.get('screen').height / 2,
    flex: 0.6,
    flexDirection: 'row',
  },
  imageLeft: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  imageRight: {
    bottom: -40,
    flex: 0.7,
    height: undefined,
    width: undefined,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 9,
  },
});
const GetStarted = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'GetStarted'>) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: theme.colors.primary,
    height: '100%',
  };

  const onNavigate = () => {
    navigation.navigate('Auth');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.primary}
      />
      {/* logo */}
      <View style={styles.sectionLogo}>
        <Image
          style={styles.logo}
          source={require('../assets/Group3.png')}
          resizeMode="contain"
        />
      </View>
      {/* text content */}
      <View>
        <Text style={styles.content} adjustsFontSizeToFit>
          Food For Everyone
        </Text>
      </View>
      {/* images */}
      <View style={styles.images}>
        <Image
          style={styles.imageLeft}
          source={require('../assets/Group67.png')}
          resizeMode="contain"
        />
        <Image
          style={styles.imageRight}
          source={require('../assets/Group68.png')}
          resizeMode="cover"
        />
      </View>
      {/* button */}
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => onNavigate()}
          title="Get Started"
          textType="labelButtonWhite"
          accessibilityLabel="Get Started"
        />
      </View>
    </SafeAreaView>
  );
};

export default GetStarted;
