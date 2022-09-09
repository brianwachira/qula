import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/shared-ui/button';
import {RootStackParamList} from '../types/types';
import hmac256 from 'crypto-js/hmac-sha256';
import {ScrollView} from 'react-native';
import Text from '../components/shared-ui/text';
import theme from '../styles/themes';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import {useStorage} from '../hooks/useStorage';
import {encode} from '../utils/encoder';
import axios, {AxiosError} from 'axios';
import {API_URL} from '@env';
import ModalPopup from '../components/shared-ui/modalPopup';
import CloseIcon from '../assets/icons/closeIcon';

const Checkout = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Checkout'>) => {
  const [user, setUser] = useStorage('user');

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
    // setLoading to true
    setLoading(true);
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

    axios
      .post(`${API_URL}/make-order?${params}`)
      .then(response => {
        if (response.data.status === false) {
          console.log('failed make order', response.data.status);
        } else {
          console.log('success make order', response.data?.status_message);
          initializePayment(encodedCipher, response.data.order_id);
        }
        // setLoading to false
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
        // setLoading to false
        setLoading(false);
      });
  };

  const initializePayment = (token: string, orderId: number) => {
    //toggle visibility
    toggleModal();

    // setLoading to true
    setLoading(true);
    // params
    const params = new URLSearchParams({
      token,
      client_id: user.clientId,
      order_id: orderId.toString(),
      msisdn: user.phone,
      amount: totalPrice?.toString() as string,
    });

    axios
      .get(`${API_URL}/initiate-payment?${params}`)
      .then(response => {
        if (response.data.responseCode === 0) {
          //success
          // setLoading to true
          setLoading(true);
        } else {
          //it is a fail
          // setLoading to false
          setLoading(false);

          // reset cart
          resetCart();

          // go to orders screen
          navigation.navigate('HomeTab', {screen: 'OrdersStack'});
        }
      })
      .catch((error: AxiosError) => {
        console.log(error.message);
      });
  };

  // function to reset cart
  const resetCart = () => {
    setUser({
      ...user,
      products: [],
    });
  };
  const [paymentOption, setPaymentOption] = useState<string>('mpesa');
  const [deliveryOption, setDeliveryOption] = useState<string>('pickup');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => setVisible(!visible);
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
      <View style={[styles.totalPriceRow, styles.modalMargin]}>
        <Text style={styles.totalPriceLabel}>Total</Text>
        <Text style={styles.totalPrice}>{totalPrice}</Text>
      </View>
      <View style={styles.buttonRow}>
        <Button
          title="Complete Order"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Complete Order"
          onPress={() => toggleModal()}
        />
      </View>
      {/* Modal Popup */}
      <ModalPopup visible={visible}>
        <View style={styles.modalContainerWrapper}>
          <View style={styles.header}>
            <Text>Please Note</Text>
            <TouchableOpacity onPress={toggleModal} disabled={loading}>
              <CloseIcon width={30} height={30} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalBodyWrapper}>
            {products.map(product => (
              <View key={product.name} style={styles.modalMargin}>
                <View style={styles.modalTextRow}>
                  <Text textType="labelLink">{product.name}</Text>
                  <Text textType="labelInput">{product.quantity} serving</Text>
                  <Text textType="labelLink">
                    {product.cost * product.quantity}
                  </Text>
                </View>
                <View style={styles.horizontalRule} />
              </View>
            ))}
            <View style={[styles.modalTextRow, styles.modalMargin]}>
              <Text>Total :</Text>
              <Text>{totalPrice}</Text>
            </View>
            <View style={styles.modalButtonRow}>
              <TouchableOpacity disabled={loading} onPress={toggleModal}>
                <View>
                  <Text textType="labelInput" textAlign="center">
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                disabled={loading}
                onPress={() => makeOrder()}>
                <View style={styles.button}>
                  {!loading ? (
                    <>
                      <Text
                        textType="labelButtonOrange"
                        textAlign="center"
                        color="white">
                        Proceed
                      </Text>
                    </>
                  ) : (
                    <>
                      <ActivityIndicator
                        color={theme.colors.white}
                        animating
                        size="large"
                      />
                    </>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ModalPopup>
      {/* End Modal Popup */}
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
    marginBottom: 15,
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
  header: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDEDED',
    borderTopLeftRadius: theme.borderRadius.button,
    borderTopRightRadius: theme.borderRadius.button,
  },
  modalContainerWrapper: {
    alignItems: 'center',
  },
  modalButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.button,
    ...theme.boxShadowAndroid,
  },
  horizontalRule: {
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: 0.5,
    opacity: 0.3,
    marginVertical: 10,
  },
  modalBodyWrapper: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  modalTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalMargin: {
    marginHorizontal: 20,
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
