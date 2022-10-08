import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useStorage} from '../hooks/useStorage';
import {RootStackParamList} from '../types/types';
import {API_URL} from '@env';
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
} from 'react-native';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import Text from '../components/shared-ui/text';
import {list} from '../constants';
import theme from '../styles/themes';
import Shimmering from '../components/shared-ui/shimmering';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RenderStatus from '../components/shared-ui/renderStatus';

const OrderDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'OrderDetails'>) => {
  // user
  const [user] = useStorage('user');

  const [orderDetails, setOrderDetails] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const {token, orderId} = route.params;

  // params
  const params = new URLSearchParams({
    token,
    //user_id: user.userId,
    //client_id: user.clientId,
    order_id: orderId,
  });

  useEffect(() => {
    // set loading true
    setLoading(true);
    axios
      .get(`${API_URL}/get-order-status?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          console.log(response.data.status);
        } else {
          setOrderDetails(response.data.data);
          console.log(response.data.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // set loading true
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <SafeAreaView style={styles.container}>
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
      <View style={styles.statusContainer}>
        <RenderStatus status={orderDetails?.order.status} />
        <View style={styles.infoItem}>
          <MaterialCommunityIcons
            name="motorbike"
            size={20}
            color={theme.colors.primary}
          />
          <Text style={styles.infoText}>
            {orderDetails?.order.to_deliver === 1
              ? 'To Be Delivered'
              : 'Seat In'}
          </Text>
        </View>
      </View>
      <ScrollView
        style={styles.categoryScrollViewContainer}
        contentContainerStyle={styles.categoryScrollViewContentContainer}>
        {/* menu items */}
        <View style={styles.menuContainer}>
          {loading === true &&
          orderDetails &&
          orderDetails.items?.length < 1 ? (
            <>
              {list.map(item => (
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
                          source={{uri: orderItem.image_path}}
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
    alignItems: 'center',
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
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 10,
  },
});
export default OrderDetails;
