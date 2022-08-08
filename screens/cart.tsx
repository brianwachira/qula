import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet, View} from 'react-native';
import CartIcon from '../assets/icons/cartIcon';
import Button from '../components/shared-ui/button';
import Text from '../components/shared-ui/text';
import theme from '../styles/themes';
import {RootStackParamList} from '../types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    flex: 1,
    marginHorizontal: 40,
  },
  contentContainer: {
    flexGrow: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textOpacity: {
    opacity: 0.57,
    fontWeight: '400',
    width: Dimensions.get('screen').width - 130,
  },
  marginBottomStyle: {
    marginBottom: 30,
  },
  marginBottomStyle2: {
    marginBottom: 20,
  },
});

const Cart = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Cart'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <CartIcon
          style={styles.marginBottomStyle}
          width={150}
          height={150}
          fill={theme.colors.icon}
        />
        <Text style={styles.marginBottomStyle2} textType="empty">
          Nothing here yet
        </Text>
        <Text style={[styles.textOpacity]} textAlign="center">
          Hit the orange button down below to view some orders
        </Text>
      </View>
      <View>
        <Button
          title="Start Ordering"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Start Ordering"
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
