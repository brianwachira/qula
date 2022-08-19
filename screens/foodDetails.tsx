import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import Button from '../components/shared-ui/button';
import Text from '../components/shared-ui/text';
import {RootStackParamList} from '../types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 40,
    marginTop: StatusBar.currentHeight,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    borderRadius: 100,
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 0.9,
    marginVertical: 10,
    marginHorizontal: 40,
  },
  backIcon: {
    marginRight: 10,
  },
  cartButtonContainer: {
    alignItems: 'center',
  },
  textPrice: {
    marginVertical: 10,
  },
  textDescription: {
    opacity: 0.57,
  },
});

const FoodDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'FoodDetails'>) => {
  const {id, title, description, price, image} = route.params.food;

  return (
    <SafeAreaView key={id} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeftIcon style={styles.backIcon} width={40} height={40} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
      </View>
      <Text textType="empty" textAlign="center">
        {title}
      </Text>
      <Text color="primary" textAlign="center" style={styles.textPrice}>
        ${price}
      </Text>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
        <Text style={styles.textDescription}>{description}</Text>
      </ScrollView>
      <View style={styles.cartButtonContainer}>
        <Button
          title="Add to cart"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Start Ordering"
        />
      </View>
    </SafeAreaView>
  );
};

export default FoodDetails;
