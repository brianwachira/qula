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

const History = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'History'>) => {
  return (
    <View style={styles.container}>
      <Text>History</Text>
    </View>
  );
};

export default History;
