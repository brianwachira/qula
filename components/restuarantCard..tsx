// resuarant card component

import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet} from 'react-native';
import theme from '../styles/themes';

import Text from './shared-ui/text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  image: {
    borderRadius: 100,
    height: 200,
    width: 200,
    resizeMode: 'cover',
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
    borderRadius: 20,
    top: '20%',
  },
});

const RestuarantCard = ({onPress, item}: {onPress: () => void; item: any}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.backdrop} />
      <Image
        source={{
          uri: item.image_url,
        }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text numberOfLines={1}>{item.name}</Text>
        <View style={styles.timeWrapper}>
          <Text> 20-30 • min • {item.price}</Text>
        </View>
        <View style={styles.ratingWrapper}>
          <Text color="primary">{item.rating}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestuarantCard;
