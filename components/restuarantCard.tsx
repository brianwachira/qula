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
      <View style={styles.cardContent}>
        <Image
          source={{
            uri: `${IMAGE_BASE_URL}/${item.image_path}`,
          }}
          style={styles.image}
        />
        <Text
          textAlign="center"
          style={styles.restuarantName}
          numberOfLines={2}>
          {item.name}
        </Text>
        <Text
          textAlign="center"
          style={styles.restuarantName}
          numberOfLines={2}>
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
    //marginRight: 20,
  },
  image: {
    borderRadius: theme.borderRadius.button,
    height: 150,
    //width: Dimensions.get('screen').width - 115,
    resizeMode: 'contain',
    // Shadow for Android
    elevation: 5,
    marginBottom: 10,
  },
  cardContent: {
    borderRadius: theme.borderRadius.button,
    flexDirection: 'column',
    paddingHorizontal: 17,
    paddingVertical: 20,
    width: Dimensions.get('screen').width - 80,
    backgroundColor: theme.colors.white,
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
  },
});
export default RestuarantCard;
