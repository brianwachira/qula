import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import theme from '../styles/themes';
import Text from './shared-ui/text';
import RenderStatus from './shared-ui/renderStatus';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const OrdersCard = (props: {onPress: () => void; order: any}) => {
  const {onPress, order} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      key={order.id}
      style={styles.orderItemContainer}
      activeOpacity={0.8}>
      <View
        style={[
          theme.globalStyle.flexRow,
          theme.globalStyle.justifyBetween,
          styles.marginBottomCustom,
        ]}>
        <View style={theme.globalStyle.flexRow}>
          <Text style={styles.statusLabel}>Order</Text>
          <Text style={[styles.statusLabel, styles.colorPrimaryRgb]}>
            #{order.id}
          </Text>
        </View>
        <Text style={[styles.statusLabel, styles.colorPrimaryRgb]}>
          {order.merchant}
        </Text>
      </View>
      <RenderStatus status={order.status} />
      <View
        style={[
          theme.globalStyle.flexRow,
          theme.globalStyle.itemsCenter,
          theme.globalStyle.justifyBetween,
          styles.marginBottomCustom,
        ]}>
        <View
          style={[theme.globalStyle.flexRow, theme.globalStyle.itemsCenter]}>
          <MaterialCommunityIcons
            name="motorbike"
            size={20}
            color={'rgba(250, 74, 12, 0.7)'}
          />
          <Text style={styles.statusLabel}>Order Type</Text>
        </View>
        <Text style={styles.infoText}>
          {order.to_deliver === '1' ? 'To Be Delivered' : 'Seat In'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  orderItemContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 15,
    padding: 15,
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
  statusLabel: {
    fontSize: 14,
    marginLeft: 4,
  },
  infoText: {
    fontSize: 12,
    opacity: 0.47,
  },
  marginBottomCustom: {
    marginBottom: 5,
  },
  colorPrimaryRgb: {
    color: 'rgba(250, 74, 12, 0.7)',
  },
});

export default OrdersCard;
