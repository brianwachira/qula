import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Shimmering from './shared-ui/shimmering';

const ShimmeringRestuarantCard = () => {
  return (
    <View style={styles.shimmerContainer}>
      <Shimmering wrapperStyle={styles.image} />
      <View style={styles.marginSeparator} />
      <Shimmering wrapperStyle={styles.cardContent} />
      <View style={styles.marginSeparator} />
      <Shimmering wrapperStyle={styles.cardContent2} />
    </View>
  );
};

export default ShimmeringRestuarantCard;

const styles = StyleSheet.create({
  shimmerContainer: {
    //marginRight: 20,
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    width: Dimensions.get('screen').width - 80,
    height: 150,
  },
  cardContent: {
    width: 200,
    height: 20,
  },
  cardContent2: {
    width: 150,
    height: 20,
  },
  marginSeparator: {
    marginVertical: 10,
  },
});
