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
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
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
    // Shadow for iOS
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
});

const OrdersCard = (props: {onPress: () => void; order: any}) => {
  const {onPress, order} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      key={order.id}
      style={styles.orderItemContainer}
      activeOpacity={0.8}>
      <View style={styles.orderItemImageContainer}>
        <Image style={styles.orderItemImage} source={{uri: order.image_path}} />
      </View>
      <View style={styles.orderItemContentContainer}>
        <Text>{order.name}</Text>
        <View style={styles.orderItemContentRow}>
          <View style={styles.orderItemQuantityButton}>
            <Text style={{color: theme.colors.white}}>
              {order.quantity} servings
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrdersCard;
