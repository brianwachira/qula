import React from 'react';
import {StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import theme from '../../styles/themes';
import Text from './text';
const RenderStatus = ({status}: {status: string}) => {
  let statusToNumber: number = parseInt(status, 10);
  let message: string = '';

  if (statusToNumber === 1) {
    message = 'Order Received';
  } else if (statusToNumber === 2) {
    message = 'Order in Preparation';
  } else if (statusToNumber === 3) {
    message = 'Order Ready';
  } else if (statusToNumber === 4) {
    message = 'Order On Delivery';
  } else if (statusToNumber === 5) {
    message = 'Order Complete!';
  } else {
    message = 'Cancelled';
  }

  return (
    <View style={styles.infoItem}>
      <AntDesign name="clockcircleo" size={20} color={theme.colors.primary} />
      <Text style={styles.infoText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12,
  },
});
export default RenderStatus;
