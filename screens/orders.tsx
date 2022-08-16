import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import RefreshIcon from '../assets/icons/refreshIcon';
import Button from '../components/shared-ui/button';
import Text from '../components/shared-ui/text';
import {meals} from '../mockdata';
import theme from '../styles/themes';
import {RootStackParamList} from '../types';

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
    marginTop: 50,
    flex: 1,
    marginHorizontal: 40,
  },
  scrollViewContainer: {
    marginVertical: 20,
    flex: 1,
  },
  cartItemContainer: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignContent: 'center',
    flex: 1,
    marginBottom: 20,
  },
  cartItemImageContainer: {marginRight: 15},
  cartItemImage: {width: 70, height: 70, borderRadius: 35},
  cartItemContentContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
  cartItemContentRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemQuantityButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.button,
    padding: 4,
    display: 'flex',
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
});

const Orders = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Orders'>) => {
  type order = {
    id: string;
    title: string;
    image: string;
  };

  const [orders, setOrders] = useState<order[]>(meals);

  if (meals.length < 1) {
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
          />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        {/* orders card */}
        {orders.map((order: {id: string; title: string; image: string}) => (
          <View key={order.id} style={styles.cartItemContainer}>
            <View style={styles.cartItemImageContainer}>
              <Image style={styles.cartItemImage} source={{uri: order.image}} />
            </View>
            <View style={styles.cartItemContentContainer}>
              <Text>{order.title}</Text>
              <View style={styles.cartItemContentRow}>
                <View style={styles.cartItemQuantityButton}>
                  <Text style={{color: theme.colors.white}}>3 servings</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
