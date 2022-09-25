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
        <Text
          textAlign="center"
          style={styles.restuarantName}
          textType="labelLink"
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
    paddingHorizontal: 17,
    paddingVertical: 20,
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
  },
  restuarantName: {
    width: 120,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default ResultsCard;
