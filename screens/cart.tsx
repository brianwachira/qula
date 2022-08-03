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

const Cart = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Cart'>) => {
  return (
    <View style={styles.container}>
      <Text>Cart</Text>
    </View>
  );
};

export default Cart;
