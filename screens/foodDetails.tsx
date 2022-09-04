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
import {RootStackParamList} from '../types/types';

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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
});

const FoodDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'FoodDetails'>) => {
  const {id, name, image_path, description, in_stock, cost} =
    route.params.product;

  const [user, setUser] = useStorage('user');

  const {email, authKey, phone, userId, clientId, products} = user;

  const [quantity, setQuantity] = useState<number>(1);

  const [productIsInCart, setProductIsInCart] = useState<boolean>(false);

  // function to handle adding item to cart
  const handleCart = () => {
    let userWithProductOnCart = {
      email,
      authKey,
      phone,
      userId,
      clientId,
      products: [
        ...products,
        {
          productID: parseInt(id, 10),
          quantity: quantity,
        },
      ],
    };
    setUser(userWithProductOnCart);
  };

  // function to add quantity
  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  // function to deduct quantity
  const deductQuantity = () => {
    setQuantity(quantity - 1);
  };

  // I am hoping this useEffect will always update my storage
  useEffect(() => {
    console.log('running');
    let userWithProductOnCart = {
      email,
      authKey,
      phone,
      userId,
      clientId,
      products: products.map(product =>
        product.productID === parseInt(id, 10)
          ? {
              productID: parseInt(id, 10),
              quantity: quantity,
            }
          : product,
      ),
    };
    setUser(userWithProductOnCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  // use effect to check whether product is in cart
  useEffect(() => {
    const isProductInCart = products.find(
      product => product.productID === parseInt(id, 10),
    );

    if (typeof isProductInCart !== 'undefined') {
      setProductIsInCart(true);
    } else {
      setProductIsInCart(false);
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
        {in_stock} {parseInt(in_stock, 10) > 1 ? 'plates' : 'plate'}
      </Text>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.textDescription}>{description}</Text>
      </ScrollView>
      {productIsInCart === true ? (
        <>
          <View style={styles.cartButtonContainer}>
            <View style={styles.cartItemQuantityButton}>
              <TouchableOpacity
                style={styles.plusButton}
                onPress={deductQuantity}>
                <Text style={{color: theme.colors.white}}>-</Text>
              </TouchableOpacity>
              <View style={styles.quantityLabel}>
                <Text style={{color: theme.colors.white}}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={styles.minusButton}
                onPress={addQuantity}>
                <Text style={{color: theme.colors.white}}>+</Text>
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
