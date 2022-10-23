import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import RefreshIcon from '../assets/icons/refreshIcon';
import OrdersCard from '../components/ordersCard';
import Button from '../components/shared-ui/button';
import Text from '../components/shared-ui/text';
import {useStorage} from '../hooks/useStorage';
import theme from '../styles/themes';
import {IOrderBulk, RootStackParamList} from '../types/types';
import {encode} from '../utils/encoder';
import hmac256 from 'crypto-js/hmac-sha256';
import axios, {AxiosResponse} from 'axios';
import {API_URL} from '@env';

const Orders = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Orders'>) => {
  // user
  const [user] = useStorage('user');

  const [orders, setOrders] = useState<IOrderBulk[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // create a cipher text
  const ciphertext: string = hmac256(
    user.userId || 'fddd',
    user.authKey || 'sdfdf',
  ).toString();

  // encoded cipher text
  const encodedCipher = encode(ciphertext);

  // params
  const params = new URLSearchParams({
    token: encodedCipher,
    user_id: user.userId,
    client_id: user.clientId,
  });

  useEffect(() => {
    // set loading true
    setLoading(true);
    axios
      .get(`${API_URL}/my-orders?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          console.log(response.data.status);
        } else {
          setOrders(response.data.data.orders);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // set loading true
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.products]);

  // onRefresh function.
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    axios
      .get(`${API_URL}/my-orders?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          console.log(response.data.status);
        } else {
          setOrders(response.data.data.orders);
        }
        // Set loading false.
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
      });

    // Set loading false.
    setRefreshing(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // show this when order state is empty
  if (loading === false && !orders) {
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
            onPress={() => navigation.navigate('HomeTab', {screen: 'Home'})}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        contentContainerStyle={styles.scrollViewContentContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* orders card */}
        {orders
          ?.reverse()
          .map(
            (orderItem: {
              id: string;
              merchant: string;
              to_deliver: string;
              status: number;
            }) => (
              <OrdersCard
                key={orderItem.id}
                order={orderItem}
                onPress={() =>
                  navigation.navigate('OrderDetails', {
                    token: encodedCipher,
                    orderId: orderItem.id,
                  })
                }
              />
            ),
          )}
      </ScrollView>
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
  container: {
    display: 'flex',
    marginTop: 10,
    flex: 1,
    marginHorizontal: 40,
  },
  scrollViewContainer: {
    marginTop: 5,
    flex: 1,
    margin: -12,
  },
  scrollViewContentContainer: {
    padding: 12,
  },
});
export default Orders;
