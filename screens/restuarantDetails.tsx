import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import {Icategories, RootStackParamList} from '../types/types';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import theme from '../styles/themes';
import axios, {AxiosResponse} from 'axios';
import {API_URL} from '@env';
import Text from '../components/shared-ui/text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    position: 'relative',
    flex: 1,
  },
  mapImageWrpper: {
    position: 'absolute',
    width: '100%',
  },
  image: {
    width: '100%',
    resizeMode: 'cover',
    height: 260,
  },
  content: {
    position: 'relative',
    zIndex: 20,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 40,
    paddingHorizontal: 40,
    marginTop: 220,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    color: '#0c0c0c',
    fontWeight: '700',
    maxWidth: '80%',
  },
  price: {
    fontSize: 20,
    color: theme.colors.primary,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: theme.colors.tab,
    borderRadius: 5,
    marginRight: 7,
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 4,
    fontSize: 12,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  categoryText: {
    borderBottomColor: theme.colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },
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
  backIconContainer: {
    position: 'absolute',
    top: 36, //top-9
    left: 36, //left-4
    zIndex: 30,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 24,
    padding: 5,
    justifyContent: 'center',
    // Shadow for Android
    elevation: 10,
  },
  mapImageWrapper: {
    position: 'absolute',
    width: '100%',
  },
  restuarantImage: {
    width: '100%',
    resizeMode: 'cover',
    height: 260,
  },
  zIndexScrollView: {
    zIndex: 20,
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
  textCategory: {
    fontSize: 12,
    color: theme.colors.black,
  },
  categoryContainer: {
    marginTop: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
const RestuarantDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'RestuarantDetails'>) => {
  const {id, name, phone, email, address, image_path, token, clientId} =
    route.params;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<Icategories[]>([]);

  // params
  const params = new URLSearchParams({
    token,
    client_id: clientId,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/fetch-products?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          console.log(response.data.status);
        } else {
          setProducts(response.data.data);
          setCategories(response.data.categories);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      {/* Back icon */}
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}
        activeOpacity={0.9}>
        <ArrowLeftIcon width={35} height={35} />
      </TouchableOpacity>
      <View style={styles.mapImageWrpper}>
        <Image source={{uri: image_path}} style={styles.restuarantImage} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <View style={styles.infoItem}>
                <Entypo
                  name="location"
                  size={14}
                  color={theme.colors.primary}
                />
                <Text style={styles.infoText}> {address || 'Nairobi'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Foundation
                  name="telephone"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text style={styles.infoText}> {phone || '0712345678'}</Text>
              </View>
              <View style={styles.infoItem}>
                <AntDesign name="star" size={12} color="#FFC238" />
                <Text style={styles.infoText}>4.5 • (20)</Text>
              </View>
              <View style={styles.infoItem}>
                <AntDesign name="clockcircleo" size={10} color="#FFC238" />
                <Text style={styles.infoText}>20-30 min</Text>
              </View>
              <View style={styles.infoItem}>
                <Foundation
                  name="mail"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text style={styles.infoText}> {email || '0712345678'}</Text>
              </View>
            </View>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Categories</Text>
            {categories.map((item, index) => (
              <View style={styles.categoryRow} key={index}>
                <Text style={{color: theme.colors.primary}}>•</Text>
                <Text style={styles.textCategory}>{item.category}</Text>
              </View>
            ))}
          </View>
          {/* menu items */}
          <View style={styles.menuContainer}>
            {products?.map(
              (
                product: {
                  id: string;
                  name: string;
                  image_path: string;
                  description: string;
                  in_stock: string;
                  cost: number;
                },
                index: React.Key | null | undefined,
              ) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuContentWrapper}
                  onPress={() =>
                    navigation.navigate('FoodDetails', {product: product})
                  }>
                  <View>
                    <Image
                      source={{uri: product.image_path}}
                      style={styles.menuImage}
                    />
                  </View>
                  <View style={styles.menuContent}>
                    <View style={styles.menuContentInfo}>
                      <Text style={styles.foodName}>{product.name}</Text>
                      <Text style={styles.foodPrice}>KES {product.cost}</Text>
                      <Text style={styles.foodDescription} numberOfLines={2}>
                        {product.description}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ),
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RestuarantDetails;
