import React, {useCallback, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Button from '../components/shared-ui/button';
import {foods} from '../mockdata';
import {RootStackParamList} from '../types';
import CartCard from '../components/cartCard';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '../components/shared-ui/text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 50,
    flex: 0.97,
    marginHorizontal: 40,
  },
  textOpacity: {
    opacity: 0.57,
    fontWeight: '400',
    width: Dimensions.get('screen').width - 130,
  },
  marginBottomStyle: {
    marginBottom: 30,
  },
  marginBottomStyle2: {
    marginBottom: 20,
  },
  scrollViewContainer: {
    marginVertical: 20,
    flex: 1,
  },
  buttonRow: {justifyContent: 'center', alignItems: 'center'},
  instructionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  swipeImage: {marginRight: 5},
  instructionsText: {fontSize: 10, fontWeight: '400'},
});

const Cart = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Cart'>) => {
  type food = {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
  };
  const [cartItems, setCartItems] = useState<food[]>(foods);

  const onDismiss = useCallback((food: food) => {
    setCartItems(cartItemsToFilter =>
      cartItemsToFilter.filter(item => item.id !== food.id),
    );
  }, []);

  // this ref allows gesture handler to handle the scroll view and the swipe gesture to render properly
  const scrollRef = useRef(null);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.instructionsContainer}>
        <Image
          style={styles.swipeImage}
          source={require('../assets/iwwa_swipe.png')}
        />
        <Text style={styles.instructionsText}>Swipe on an item to delete</Text>
      </View>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}
        ref={scrollRef}>
        {cartItems.map(
          (cartItem: {
            id: string;
            title: string;
            price: number;
            description: string;
            image: string;
          }) => (
            <CartCard key={cartItem.id} item={cartItem} onDismiss={onDismiss} />
          ),
        )}
      </ScrollView>
      <View style={styles.buttonRow}>
        <Button
          title="Complete Order"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Complete Order"
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
