// resuarant card component
import {IMAGE_BASE_URL} from '@env';
import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
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
      <View style={styles.backdrop} />
      <Image
        source={{
          uri: `${IMAGE_BASE_URL}/${item.image_path}`,
        }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text
          textAlign="center"
          style={styles.restuarantName}
          numberOfLines={2}>
          {item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    borderRadius: 60,
    height: 120,
    width: 120,
    resizeMode: 'cover',
    // Shadow for Android
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 17,
    paddingVertical: 20,
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
    borderRadius: 30,
    marginTop: 10,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    top: '30%',
    // Shadow for Android
    elevation: 5,
  },
  restuarantName: {
    width: 120,
    fontSize: 12,
  },
});
export default RestuarantCard;
