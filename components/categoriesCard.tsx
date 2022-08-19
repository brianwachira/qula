import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../styles/themes';
import Text from './shared-ui/text';

const styles = StyleSheet.create({
  categoriesContainer: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginRight: 15,
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
  image: {
    width: 50,
    height: 50,
  },
});

const CategoriesCard = ({onPress, item}: {onPress: () => void; item: any}) => {
  return (
    <TouchableOpacity style={styles.categoriesContainer} onPress={onPress}>
      <Image style={styles.image} source={item.image} />
      <Text textAlign="center">{item.text}</Text>
    </TouchableOpacity>
  );
};

export default CategoriesCard;
