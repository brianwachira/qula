import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {IOrderDetails, RootStackParamList} from '../types/types';
import {API_URL, IMAGE_BASE_URL} from '@env';
import axios, {AxiosResponse} from 'axios';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  RefreshControl,
} from 'react-native';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import Text from '../components/shared-ui/text';
import {list} from '../constants';
import theme from '../styles/themes';
import Shimmering from '../components/shared-ui/shimmering';
import * as Sentry from '@sentry/react-native';

const OrderDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'OrderDetails'>) => {
  const [orderDetails, setOrderDetails] = useState<IOrderDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {token, orderId} = route.params;

  // params
  const params = new URLSearchParams({
    token,
    order_id: orderId,
  });

  /**
   * useEffect to fetch order details.
   */

  useEffect(() => {
    // set loading true
    setLoading(true);
    axios
      .get(`${API_URL}/get-order-status?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
        } else {
          setOrderDetails(response.data.data);
        }
      })
      .catch(error => {
        console.log(error);
        Sentry.captureException('Order Details Error: ' + error);
        Sentry.captureException(
          'Order Details Description: ' + error.response.data.message,
        );
      });
    // set loading true
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  // onRefersh function.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios
      .get(`${API_URL}/get-order-status?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          console.log(response.data.status_message);
        } else {
          setOrderDetails(response.data.data);
          console.log(response.data.data);
        }
        setRefreshing(false);
      })
      .catch(error => {
        console.log(error);
        Sentry.captureException('Refresh Order Details Error: ' + error);
        Sentry.captureException(
          'Refresh Order Details Description: ' + error.response.data.message,
        );
        setRefreshing(false);
      });

    setRefreshing(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let message: string = '';
  let statusToNumber: number = parseInt(
    orderDetails?.order.status as string,
    10,
  );

  if (statusToNumber === 1) {
    message = 'Order Received';
  } else if (statusToNumber === 2) {
    message = 'Order in Preparation';
  } else if (statusToNumber === 3) {
    message = 'Order Ready';
  } else if (statusToNumber === 4) {
    message = 'Order On Delivery';
  } else if (statusToNumber === 5) {
    message = 'Order Complete!';
  } else {
    message = 'Cancelled';
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={theme.colors.tab} />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HomeTab', {screen: 'Orders'})}>
          <ArrowLeftIcon style={styles.backIcon} width={40} height={40} />
        </TouchableOpacity>
        <View>
          <Text>Order #{orderId}</Text>
        </View>
        <View />
        <View />
      </View>
      <View
        style={[theme.globalStyle.flexRow, theme.globalStyle.justifyBetween]}>
        <Text>Order Date</Text>
        <Text>{orderDetails?.order.inserted_at}</Text>
      </View>
      <View style={styles.horizontalRule} />
      <View
        style={[theme.globalStyle.flexRow, theme.globalStyle.justifyBetween]}>
        <Text>Order Status</Text>
        <Text>{message}</Text>
      </View>
      <View style={styles.horizontalRule} />
      <View
        style={[theme.globalStyle.flexRow, theme.globalStyle.justifyBetween]}>
        <Text>Order Type</Text>
        <Text>
          {orderDetails?.order.to_deliver === '1'
            ? 'To Be Delivered'
            : 'Seat In'}
        </Text>
      </View>
      <View style={styles.horizontalRule} />
      <Text>Items on Cart</Text>
      <View style={styles.marginBottomCustom} />
      <ScrollView
        style={styles.categoryScrollViewContainer}
        contentContainerStyle={styles.categoryScrollViewContentContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* menu items */}
        <View style={styles.menuContainer}>
          {loading === true &&
          orderDetails &&
          orderDetails.items?.length < 1 ? (
            <>
              {list.map(item => (
                <>
                  <View style={styles.menuContentWrapper} key={item.id + 20}>
                    <View>
                      <Shimmering wrapperStyle={styles.menuImage} />
                    </View>
                    <View style={styles.menuContent}>
                      <View style={styles.menuContentInfo}>
                        <Shimmering wrapperStyle={styles.foodNameShimmering} />
                        <View style={styles.menuContentShimmeringMargin} />
                        <Shimmering wrapperStyle={styles.foodPriceShimmering} />
                        <View style={styles.menuContentShimmeringMargin} />
                        <Shimmering
                          wrapperStyle={styles.foodDescriptionShimmering}
                        />
                        <View style={styles.menuContentShimmeringMargin} />
                        <Shimmering
                          wrapperStyle={styles.foodDescriptionShimmering2}
                        />
                      </View>
                    </View>
                  </View>
                  <View style={styles.horizontalRule} />
                </>
              ))}
            </>
          ) : (
            <>
              {orderDetails?.items.length !== undefined &&
                orderDetails?.items?.map(
                  (
                    orderItem: {
                      name: string;
                      product_id: string;
                      quantity: string;
                      unit_cost: string;
                      image_path: string;
                    },
                    index: React.Key | null | undefined,
                  ) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.menuContentWrapper}>
                      <View>
                        <Image
                          source={{
                            uri: `${IMAGE_BASE_URL}/${orderItem.image_path}`,
                          }}
                          style={styles.menuImage}
                        />
                      </View>
                      <View style={styles.menuContent}>
                        <View style={styles.menuContentInfo}>
                          <Text style={styles.foodName}>{orderItem.name}</Text>
                          <Text style={styles.foodPrice}>
                            KES {orderItem.unit_cost} x {orderItem.quantity}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ),
                )}
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    marginTop: 20, // mt-5
    marginBottom: 48, // mb-12
  },
  menuContentWrapper: {
    marginBottom: 12, // mb-3
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomColor: theme.colors.tab,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuContent: {
    flex: 1,
    paddingRight: 12, // pr-3
    flexDirection: 'row',
  },
  menuContentInfo: {
    flex: 1,
    paddingLeft: 8, // pl-2
  },
  menuImage: {
    height: 100, //h-16
    width: 100, //w-16
    borderRadius: 50, //rounded-lg
  },
  container: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 40,
    marginTop: StatusBar.currentHeight,
  },
  backIcon: {
    marginRight: 10,
  },
  categoryScrollViewContainer: {
    margin: -12,
  },
  categoryScrollViewContentContainer: {
    padding: 12,
  },
  categoryRowShimmering: {
    width: 70,
    height: 35,
    borderRadius: 15,
    ...theme.boxShadowAndroid,
  },
  categoryRowShimmeringMargin: {
    marginRight: 15,
  },
  foodNameShimmering: {
    width: Dimensions.get('screen').width - 190 || 150,
    height: 20,
  },
  foodPriceShimmering: {
    width: 50,
    height: 20,
  },
  foodDescriptionShimmering: {
    width: Dimensions.get('screen').width - 190 || 150,
    height: 20,
  },
  foodDescriptionShimmering2: {
    width: Dimensions.get('screen').width - 230 || 150,
    height: 20,
  },
  menuContentShimmeringMargin: {
    marginBottom: 8,
  },
  foodName: {
    fontSize: 16,
  },
  foodPrice: {
    fontSize: 12,
    lineHeight: 16,
  },
  foodDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 15,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: StatusBar.currentHeight,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
  horizontalRule: {
    borderBottomColor: theme.colors.grey,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 24,
  },
  marginBottomCustom: {
    marginBottom: 12,
  },
});
export default OrderDetails;
