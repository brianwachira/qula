import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
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
import {useStorage} from '../hooks/useStorage';
import theme from '../styles/themes';
import {
  cartProduct,
  defaultStorageObject,
  RootStackParamList,
} from '../types/types';

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
    marginVertical: 5,
  },
  textPlate: {
    backgroundColor: theme.colors.tab,
  },
  textDescription: {
    opacity: 0.57,
  },
  cartItemQuantityButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.button,
    padding: 4,
    paddingVertical: 14,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    ...theme.boxShadowAndroid,
  },
  plusButton: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  quantityLabel: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  minusButton: {
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  textButtonLabel: {
    marginBottom: 10,
  },
});

const FoodDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'FoodDetails'>) => {
  const {id, name, image_path, description, in_stock, cost} =
    route.params.product;

  const [user, setUser] = useStorage('user');

  const {email, authKey, phone, userId, clientId, products} = user;

  const [productInCart, setProductInCart] = useState<cartProduct>();
  // function to handle adding item to cart
  const handleCart = () => {
    // new product to save in cart
    let newProductInCart = {
      id,
      name,
      image_path,
      description,
      in_stock,
      cost,
      quantity: 1,
    };
    // user object containing product in cart
    let userWithProductOnCart = {
      email,
      authKey,
      phone,
      userId,
      clientId,
      products: [...products, newProductInCart],
    };

    // save updated user
    setUser(userWithProductOnCart);

    // save product in cart to state
    setProductInCart(newProductInCart);
  };

  // function to add quantity
  const addQuantity = () => {
    // updated product with quantity
    let updatedProductInCart = {
      ...productInCart,
      quantity: productInCart!.quantity + 1,
    };

    // user object containing updated product in cart
    let userWithProductOnCart = {
      email,
      authKey,
      phone,
      userId,
      clientId,
      products: products.map(product =>
        parseInt(product.id, 10) === parseInt(id, 10)
          ? updatedProductInCart
          : product,
      ),
    };

    // save updated user
    setUser(userWithProductOnCart as defaultStorageObject);

    // save updated product in cart to state
    setProductInCart(updatedProductInCart as cartProduct);
  };

  // function to deduct quantity
  const deductQuantity = () => {
    if (productInCart!.quantity - 1 === 0) {
      // remove it from cart
      let userWithoutProductOnCart = {
        email,
        authKey,
        phone,
        userId,
        clientId,
        products: products.filter(
          product => parseInt(product.id, 10) !== parseInt(id, 10),
        ),
      };

      // save updated user
      setUser(userWithoutProductOnCart);

      // remove cart product from state
      setProductInCart(undefined);
    } else {
      // updated product with quantity
      let updatedProductInCart = {
        ...productInCart,
        quantity: productInCart!.quantity - 1,
      };

      // user object containing updated product in cart
      let userWithProductOnCart = {
        email,
        authKey,
        phone,
        userId,
        clientId,
        products: products.map(product =>
          parseInt(product.id, 10) === parseInt(id, 10)
            ? updatedProductInCart
            : product,
        ),
      };

      // save updated user
      setUser(userWithProductOnCart as defaultStorageObject);

      // save updated product in cart to state
      setProductInCart(updatedProductInCart as cartProduct);
    }
  };

  // use effect to check whether product is in cart
  useEffect(() => {
    // look for the product
    const productIsInCart = products.find(
      product => parseInt(product.id, 10) === parseInt(id, 10),
    );
    if (typeof productIsInCart !== undefined) {
      // save the product in cart to state
      setProductInCart(productIsInCart);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <SafeAreaView key={id} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ArrowLeftIcon style={styles.backIcon} width={40} height={40} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={{uri: image_path}} style={styles.image} />
      </View>
      <Text textType="empty" textAlign="center">
        {name}
      </Text>
      <Text color="primary" textAlign="center" style={styles.textPrice}>
        KES {cost}
      </Text>
      <Text color="primary" textAlign="center" style={styles.textPlate}>
        {productInCart ? (
          <>{parseInt(in_stock, 10) - productInCart.quantity}</>
        ) : (
          <>{in_stock}</>
        )}
        {parseInt(in_stock, 10) > 1 ? (
          ' plates remaining'
        ) : (
          <>
            {parseInt(in_stock, 10) - productInCart?.quantity === 0
              ? ' plates remaining'
              : ' plate remaining'}
          </>
        )}
      </Text>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.textDescription}>{description}</Text>
      </ScrollView>
      {productInCart ? (
        <>
          {/*  cart item button */}
          <View style={styles.cartButtonContainer}>
            <Text textAlign="center" style={styles.textButtonLabel}>
              Quantity
            </Text>
            <View style={styles.cartItemQuantityButton}>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={deductQuantity}
                disabled={productInCart?.quantity === 0}>
                <Text style={{color: theme.colors.white}} textType="empty">
                  -
                </Text>
              </TouchableOpacity>
              <View style={styles.quantityLabel}>
                <Text style={{color: theme.colors.white}} textType="empty">
                  {productInCart?.quantity}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.minusButton}
                onPress={addQuantity}
                disabled={productInCart?.quantity === parseInt(in_stock, 10)}>
                <Text style={{color: theme.colors.white}} textType="empty">
                  +
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={styles.cartButtonContainer}>
            <Button
              title="Add to cart"
              buttonType="orange"
              textType="labelButtonOrange"
              accessibilityLabel="Start Ordering"
              onPress={handleCart}
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default FoodDetails;
