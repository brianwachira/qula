import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../components/shared-ui/button';
import Text from '../components/shared-ui/text';
import {foods} from '../mockdata';
import theme from '../styles/themes';
import {RootStackParamList} from '../types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: StatusBar.currentHeight + 50,
    flex: 0.97,
    marginHorizontal: 40,
  },
  contentContainer: {
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
  scrollViewContainer: {marginVertical: 20},
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
  buttonRow: {justifyContent: 'center', alignItems: 'center'},
});

const Cart = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Cart'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        {foods.map(
          (food: {
            id: string;
            title: string;
            price: number;
            description: string;
            image: string;
          }) => (
            <View key={food.id} style={styles.cartItemContainer}>
              <View style={styles.cartItemImageContainer}>
                <Image
                  style={styles.cartItemImage}
                  source={{uri: food.image}}
                />
              </View>
              <View style={styles.cartItemContentContainer}>
                <Text>{food.title}</Text>
                <View style={styles.cartItemContentRow}>
                  <Text color="primary">${food.price}</Text>
                  <View style={styles.cartItemQuantityButton}>
                    <TouchableOpacity style={styles.plusButton}>
                      <Text style={{color: theme.colors.white}}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.quantityLabel}>
                      <Text style={{color: theme.colors.white}}>0</Text>
                    </View>
                    <TouchableOpacity style={styles.minusButton}>
                      <Text style={{color: theme.colors.white}}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ),
        )}
      </ScrollView>
      <View style={styles.buttonRow}>
        <Button
          title="Complete Order"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Complete Order"
        />
      </View>
    </SafeAreaView>
  );
};

export default Cart;
