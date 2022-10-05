import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Shimmering from './shared-ui/shimmering';

const ShimmeringRestuarantCard = () => {
  return (
    <View style={styles.shimmerContainer}>
      <View style={styles.backdrop} />
      <Shimmering wrapperStyle={styles.image} />
      <Shimmering wrapperStyle={styles.cardContent} />
    </View>
  );
};

export default ShimmeringRestuarantCard;

const styles = StyleSheet.create({
  shimmerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgb(234, 234, 234)',
    borderRadius: 30,
    top: '30%',
    // Shadow for Android
    elevation: 5,
  },
  image: {
    borderRadius: 60,
    height: 120,
    width: 120,
    // Shadow for Android
    elevation: 5,
  },
  cardContent: {
    width: Dimensions.get('screen').width / 2.65,
    height: Dimensions.get('screen').width / 4,
  },
});
