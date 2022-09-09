import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Dimensions, Image, SafeAreaView, StyleSheet, View} from 'react-native';
import Button from '../components/shared-ui/button';
import {cartProduct, RootStackParamList} from '../types/types';
import CartCard from '../components/cartCard';
import {ScrollView} from 'react-native-gesture-handler';
import Text from '../components/shared-ui/text';
import {useStorage} from '../hooks/useStorage';
import RefreshIcon from '../assets/icons/refreshIcon';
import theme from '../styles/themes';

const Cart = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Cart'>) => {
  // user object from useStorage hook
  const [user, setUser] = useStorage('user');

  const {products} = user;

  // products in cart state
  const [productsInCart, setProductsInCart] = useState<cartProduct[]>(
    products as cartProduct[],
  );

  // use effect to add products to cart
  useEffect(() => {
    setProductsInCart(products);
  }, [products]);

  const onDismiss = (cartItem: cartProduct) => {
    // save to productsInCart state
    setProductsInCart(
      productsInCart?.filter(productInCart => productInCart.id !== cartItem.id),
    );

    //
    setUser({
      ...user,
      products: products.filter(product => product.id !== cartItem.id),
    });
  };

  // function to add quantity
  const addQuantity = (cartItem: cartProduct) => {
    console.log('pressed');
    // updated product with quantity
    let updatedProductInCart = {
      ...cartItem,
      quantity: cartItem.quantity + 1,
    };

    // user object containing updated product in cart
    let userWithProductOnCart = {
      ...user,
      products: products.map(product =>
        product.id === cartItem.id ? updatedProductInCart : product,
      ),
    };

    // save updated user
    setUser(userWithProductOnCart);

    // save updated product in cart to state
    setProductsInCart(
      productsInCart?.map(productInCart =>
        productInCart.id === cartItem.id ? updatedProductInCart : productInCart,
      ),
    );
  };

  // function to deduct quantity
  const deductQuantity = (cartItem: cartProduct) => {
    if (cartItem.quantity - 1 === 0) {
      onDismiss(cartItem);
    } else {
      // updated product with quantity
      let updatedProductInCart = {
        ...cartItem,
        quantity: cartItem.quantity - 1,
      };

      // user object containing updated product in cart
      let userWithProductOnCart = {
        ...user,
        products: products.map(product =>
          product.id === cartItem.id ? updatedProductInCart : product,
        ),
      };

      // save updated user
      setUser(userWithProductOnCart);

      // save updated product in cart to state
      setProductsInCart(
        productsInCart?.map(productInCart =>
          productInCart.id === cartItem.id
            ? updatedProductInCart
            : productInCart,
        ),
      );
    }
  };

  const goToCheckout = () => {
    navigation.navigate('Checkout');
  };

  // this ref allows gesture handler to handle the scroll view and the swipe gesture to render properly
  const scrollRef = useRef(null);

  // show this when merchant state is empty
  if (productsInCart.length < 1) {
    return (
      <SafeAreaView style={styles.containerEmpty}>
        <View style={styles.contentContainerEmpty}>
          <RefreshIcon
            style={styles.marginBottomStyle}
            width={150}
            height={150}
            fill={theme.colors.icon}
          />

          <Text style={styles.marginBottomStyle2} textType="empty">
            Nothing here yet
          </Text>
          <Text style={[styles.textOpacity]} textAlign="center">
            Hit the orange button down below to view some orders
          </Text>
        </View>
        <View>
          <Button
            title="Start Ordering"
            buttonType="orange"
            textType="labelButtonOrange"
            accessibilityLabel="Start Ordering"
            onPress={() =>
              navigation.navigate('HomeTab', {screen: 'HomeStack'})
            }
          />
        </View>
      </SafeAreaView>
    );
  }
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
        {productsInCart?.map(
          (cartItem: {
            id: number;
            name: string;
            description: string;
            category_id: number;
            cost: number;
            in_stock: string;
            image_path: string;
            quantity: number;
          }) => (
            <CartCard
              key={cartItem.id}
              item={cartItem}
              onDismiss={onDismiss}
              onAddQuantity={addQuantity}
              onDeductQuantity={deductQuantity}
            />
          ),
        )}
      </ScrollView>
      <View style={styles.buttonRow}>
        <Button
          title="Checkout"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="checkout"
          onPress={goToCheckout}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerEmpty: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
    flex: 1,
    marginHorizontal: 40,
  },
  contentContainerEmpty: {
    flexGrow: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
export default Cart;
