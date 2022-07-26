import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import theme from '../styles/themes';
import { RootStackParamList } from '../types';

const styles = StyleSheet.create({
  sectionLogo: {
    marginBottom: 31,
  },
  logo: {
    width: 73,
    height: 73,
  },
  content: {
    fontStyle: 'normal',
    fontSize: 65,
    fontWeight: '800',
    lineHeight: 80,
  },
  images: {
    position: 'relative',
  },
  imageLeft: {
    position: 'absolute',
    left: 0,
    zIndex: 6,
  },
  imageRight: {
    position: 'absolute',
    right: 0,
    zIndex: 2,
    top: 90,
  },
  buttonStyle: {
    width: 100,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      {/* logo */}
      <View style={styles.sectionLogo}>
        <Image style={styles.logo} source={require('../assets/Group3.png')} />
      </View>
      {/* text content */}
      <View>
        <Text style={styles.content}>Food For Everyone</Text>
      </View>
      {/* images */}
      <View style={styles.images}>
        <Image
          style={styles.imageLeft}
          source={require('../assets/ToyFaces_Tansparent_BG_49.png')}
        />
        <Image
          style={styles.imageRight}
          source={require('../assets/ToyFaces_Tansparent_BG_29.png')}
        />
      </View>
      {/* button */}
      <TouchableOpacity>
        <View style={styles.buttonStyle}>
          <Text>Get Started</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default GetStarted;
