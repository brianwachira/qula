// resuarant card component
import {IMAGE_BASE_URL} from '@env';
import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import theme from '../styles/themes';
import {Imerchants} from '../types/types';

import Text from './shared-ui/text';

const RestuarantCard = ({
  onPress,
  item,
}: {
  onPress: () => void;
  item: Imerchants;
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}>
      <Image
        source={{
          uri: `${IMAGE_BASE_URL}/${item.image_path}`,
        }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text numberOfLines={2}>{item.name}</Text>
        <Text style={styles.restuarantName} numberOfLines={2}>
          {item.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: theme.boxShadowAndroid.elevation,
    shadowColor: theme.boxShadowAndroid.shadowColor,
  },
  image: {
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    height: 150,
    resizeMode: 'contain',
    // Shadow for Android
    elevation: 5,
  },
  cardContent: {
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    flexDirection: 'column',
    paddingHorizontal: 5,
    paddingVertical: 10,
    width: Dimensions.get('screen').width - 80,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7E6E2',
    padding: 5,
    borderRadius: theme.borderRadius.button,
    marginTop: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.white,
    borderRadius: theme.borderRadius.button,
    top: '-10%',
    // Shadow for Android
    elevation: 5,
  },
  restuarantName: {
    //width: 120,
    fontSize: 12,
    opacity: 0.47,
  },
});
export default RestuarantCard;
