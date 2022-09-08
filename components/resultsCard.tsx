// results card
import React from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import theme from '../styles/themes';
import {Imerchants} from '../types/types';

import Text from './shared-ui/text';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 40,
    marginTop: 20,
  },
  image: {
    borderRadius: 60,
    height: 120,
    width: 120,
    resizeMode: 'cover',
  },
  cardContent: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  timeWrapper: {
    marginTop: 10,
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
    top: '25%',
  },
});

const ResultsCard = ({
  onPress,
  item,
  stylesCustom,
}: {
  onPress: () => void;
  item: Imerchants;
  stylesCustom?: StyleProp<ViewStyle>;
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, stylesCustom]}
      onPress={onPress}>
      <View style={styles.backdrop} />
      <Image
        source={{
          uri: item.image_path,
        }}
        style={styles.image}
      />
      <View style={styles.cardContent}>
        <Text textAlign="center" numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.timeWrapper}>
          <Text textAlign="center" color="primary">
            ${item.address}
          </Text>
        </View>
        {/* <View style={styles.ratingWrapper}>
          <Text color="primary">{item.rating}</Text>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default ResultsCard;
