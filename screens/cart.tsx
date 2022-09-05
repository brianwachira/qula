import React, {useCallback, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Button from '../components/shared-ui/button';
import {cartProduct, RootStackParamList} from '../types/types';
import CartCard from '../components/cartCard';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '../components/shared-ui/text';
import {useStorage} from '../hooks/useStorage';

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
  // user object from useStorage hook
  const [user, setUser] = useStorage('user');

  const {products} = user;
  console.log(products);

  const onDismiss = useCallback((cartItem: cartProduct) => {
    //console.log(cartItem.id);
    // remove it from cart
    // let userWithoutProductOnCart = {
    //   ...user,
    //   products: products.filter(product => product.id !== cartItem.id),
    // };
    // console.log(userWithoutProductOnCart);
    // save updated user
    setUser({
      ...user,
      products: products.filter(product => product.id !== cartItem.id),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {products.map(
          (cartItem: {
            id: number;
            name: string;
            description: string;
            cost: number;
            in_stock: string;
            image_path: string;
            quantity: number;
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
