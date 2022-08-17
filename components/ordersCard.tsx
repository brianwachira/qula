import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import theme from '../styles/themes';
import Text from './shared-ui/text';

const styles = StyleSheet.create({
  orderItemContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    flex: 1,
    marginBottom: 20,
  },
  orderItemImageContainer: {marginRight: 15},
  orderItemImage: {width: 70, height: 70, borderRadius: 35},
  orderItemContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  orderItemContentRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItemQuantityButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.button,
    padding: 4,
    display: 'flex',
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

const OrdersCard = (props: {onPress: () => void; order: any}) => {
  const {onPress, order} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      key={order.id}
      style={styles.orderItemContainer}>
      <View style={styles.orderItemImageContainer}>
        <Image style={styles.orderItemImage} source={{uri: order.image}} />
      </View>
      <View style={styles.orderItemContentContainer}>
        <Text>{order.title}</Text>
        <View style={styles.orderItemContentRow}>
          <View style={styles.orderItemQuantityButton}>
            <Text style={{color: theme.colors.white}}>3 servings</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrdersCard;
