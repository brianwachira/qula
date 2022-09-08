import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Button from '../components/shared-ui/button';
import {RootStackParamList} from '../types/types';
import hmac256 from 'crypto-js/hmac-sha256';
import {ScrollView} from 'react-native';
import Text from '../components/shared-ui/text';
import theme from '../styles/themes';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import {useStorage} from '../hooks/useStorage';
import {encode} from '../utils/encoder';
import axios from 'axios';
import {API_URL} from '@env';

const Checkout = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Checkout'>) => {
  const [user] = useStorage('user');

  const {userId, clientId, products} = user;

  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    // get total price from cart when products property changes
    const totalPriceUpdated: number = products.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.quantity * currentValue.cost,
      0,
    );

    // set total price
    setTotalPrice(totalPriceUpdated);
  }, [products]);

  const makeOrder = () => {
    const orders = products.map(product => {
      return {
        productID: product.id,
        quantity: product.quantity,
      };
    });
    const payload = {
      userID: userId,
      clientID: clientId,
      products: orders,
    };

    // generate token
    const ciphertext: string = hmac256(user.userId, user.authKey).toString();

    // encoded cipher text
    const encodedCipher = encode(ciphertext);

    // params
    const params = new URLSearchParams({
      token: encodedCipher,
      client_id: user.clientId,
      cart: JSON.stringify(payload),
    });

    axios.post(`${API_URL}/make-order?${params}`).then(response => {
      if (response.data.status === false) {
        console.log('failed make order', response.data.status);
      } else {
        console.log('success make order', response.data?.status_message);
        initializePayment(encodedCipher, response.data.order_id);
      }
    });
  };

  const initializePayment = (token: string, orderId: number) => {
    // params
    const params = new URLSearchParams({
      token,
      client_id: user.clientId,
      order_id: orderId.toString(),
      msisdn: '254707250844',
      amount: totalPrice?.toString() as string,
    });

    axios.post(`${API_URL}/initiate-payment?${params}`).then(response => {
      if (response.data.status === false) {
        console.log('failed initiate payment', response.data.status);
      } else {
        console.log('success initiate payment', response.data?.status_message);
      }
    });
  };

  const [paymentOption, setPaymentOption] = useState<string>('mpesa');
  const [deliveryOption, setDeliveryOption] = useState<string>('pickup');
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeTab', {screen: 'CartStack'})}>
        <ArrowLeftIcon style={styles.backIcon} width={40} height={40} />
      </TouchableOpacity>
      <View style={styles.title}>
        <Text textType="empty">Payment</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textProfileLabel}>Payment Details</Text>
        <View style={styles.card}>
          {paymentOptions.map(item => (
            <TouchableOpacity
              key={item.key}
              style={[styles.radioOptionContainer]}
              onPress={() => setPaymentOption(item.key)}>
              <View style={[styles.radioCircle]}>
                {paymentOption === item.key && (
                  <View style={styles.radioCircleSelected} />
                )}
              </View>
              <Text style={styles.radioOptionText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.textProfileLabel}>Delivery Method</Text>
        <View style={styles.card}>
          {deliveryOptions.map(item => (
            <TouchableOpacity
              key={item.key}
              style={styles.radioOptionContainer}
              onPress={() => setDeliveryOption(item.key)}>
              <View style={styles.radioCircle}>
                {deliveryOption === item.key && (
                  <View style={styles.radioCircleSelected} />
                )}
              </View>
              <Text style={styles.radioOptionText}>{item.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.totalPriceRow}>
        <Text style={styles.totalPriceLabel}>Total</Text>
        <Text style={styles.totalPrice}>{totalPrice}</Text>
      </View>
      <View style={styles.buttonRow}>
        <Button
          title="Complete Order"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Complete Order"
          onPress={() => makeOrder()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 50,
    flex: 0.97,
    marginHorizontal: 40,
  },
  title: {
    marginVertical: 20,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  textProfileLabel: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 15,
  },
  card: {
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: 15,
    paddingHorizontal: 15,
    alignItems: 'flex-start',
    marginBottom: 15,
    ...theme.boxShadowAndroid,
  },
  radioOptionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomColor: theme.colors.grey,
    alignItems: 'center',
    marginBottom: 10,
  },
  radioCircle: {
    height: 25,
    width: 25,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioCircleSelected: {
    width: 12.5,
    height: 12.5,
    borderRadius: 50,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOptionText: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
  },
  buttonRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalPriceLabel: {
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 20,
  },
  totalPrice: {
    fontWeight: '600',
    fontSize: 22,
    lineHeight: 26,
  },
  backIcon: {
    marginRight: 10,
  },
});

const paymentOptions = [
  {
    key: 'mpesa',
    text: 'M-Pesa',
  },
  {
    key: 'card',
    text: 'Card',
  },
  {
    key: 'bankaccount',
    text: 'Bank Account',
  },
];

const deliveryOptions = [
  {
    key: 'doordelivery',
    text: 'Door Delivery',
  },
  {
    key: 'pickup',
    text: 'Pick Up',
  },
];
