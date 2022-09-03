// resuarant card component
import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import theme from '../styles/themes';
import {Imerchants} from '../types/types';

import Text from './shared-ui/text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    borderRadius: 85,
    height: 170,
    width: 170,
    resizeMode: 'cover',
    // Shadow for Android
    elevation: 5,
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 50,
    paddingVertical: 30,
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
    top: '20%',
    // Shadow for Android
    elevation: 5,
  },
  restuarantName: {
    width: 120,
  },
});

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
          uri: item.image_path,
        }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text style={styles.restuarantName} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.timeWrapper}>
          <Text>20-30 • min</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestuarantCard;
