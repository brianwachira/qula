import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../components/shared-ui/text';
import {RootStackParamList} from '../types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
