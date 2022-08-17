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
import OrdersCard from '../components/ordersCard';
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

  // show this when order state is empty
  if (orders.length < 1) {
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
          <OrdersCard
            key={order.id}
            order={order}
            onPress={() => console.log('clicked')}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Orders;
