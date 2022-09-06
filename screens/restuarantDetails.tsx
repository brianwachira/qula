import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
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
import {list} from '../constants';
import Shimmering from '../components/shared-ui/shimmering';

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
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: theme.colors.tab,
    borderRadius: 5,
    marginRight: 15,
    marginBottom: 15,
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
  categoryContainer: {
    marginTop: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.tab,
    marginRight: 15,
    padding: 7,
    paddingHorizontal: 10,
    borderRadius: 15,
    ...theme.boxShadowAndroid,
  },
  categoryRowSelected: {
    backgroundColor: theme.colors.primary,
  },
  categoryText: {
    borderBottomColor: theme.colors.primary,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  textCategory: {
    fontSize: 15,
    color: theme.colors.black,
  },
  textCategorySelected: {
    color: theme.colors.white,
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
});
const RestuarantDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'RestuarantDetails'>) => {
  const {name, phone, email, address, image_path, token, clientId} =
    route.params;

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [category, setCategory] = useState<Icategories>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // set loading true
    setLoading(true);

    // params
    const params = new URLSearchParams({
      token,
      client_id: clientId,
    });
    axios
      .get(`${API_URL}/fetch-products?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          console.log(response.data.status);
        } else {
          setProducts(response.data.data);
          setCategories(response.data.categories);
          setCategory(response.data.categories[0]);
        }
      });
    // set loading true
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);
  return (
    <View style={styles.container}>
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      /> */}
      {/* Back icon */}
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.navigate('HomeTab', {screen: 'HomeStack'})}
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
            <ScrollView
              style={styles.categoryScrollViewContainer}
              contentContainerStyle={styles.categoryScrollViewContentContainer}
              horizontal>
              {loading === true || categories.length < 1 ? (
                <>
                  {list.map(item => (
                    <>
                      <Shimmering
                        key={item.id + 10}
                        wrapperStyle={styles.categoryRowShimmering}
                      />
                      <View style={styles.categoryRowShimmeringMargin} />
                    </>
                  ))}
                </>
              ) : (
                <>
                  {categories.map((item, index) => (
                    <TouchableOpacity
                      style={[
                        styles.categoryRow,
                        category?.category === item.category &&
                          styles.categoryRowSelected,
                      ]}
                      onPress={() => setCategory(item)}
                      key={index}
                      activeOpacity={0.8}>
                      <Text
                        style={[
                          styles.textCategory,
                          category?.category === item.category &&
                            styles.textCategorySelected,
                        ]}>
                        {item.category}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </ScrollView>
          </View>
          {/* menu items */}
          <View style={styles.menuContainer}>
            {loading === true || products.length < 1 ? (
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
                          <Text style={styles.foodPrice}>
                            KES {product.cost}
                          </Text>
                          <Text
                            style={styles.foodDescription}
                            numberOfLines={2}>
                            {product.description}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ),
                )}
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RestuarantDetails;
