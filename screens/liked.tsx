import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../components/shared-ui/text';
import {RootStackParamList} from '../types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Liked = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Liked'>) => {
  return (
    <View style={styles.container}>
      <Text>Liked</Text>
    </View>
  );
};

export default Liked;
