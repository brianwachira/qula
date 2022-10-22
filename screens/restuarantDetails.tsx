import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
  RefreshControl,
  ImageBackground,
} from 'react-native';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import {Icategories, product, RootStackParamList} from '../types/types';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import theme from '../styles/themes';
import axios, {AxiosResponse} from 'axios';
import {API_URL, IMAGE_BASE_URL} from '@env';
import Text from '../components/shared-ui/text';
import {list} from '../constants';
import Shimmering from '../components/shared-ui/shimmering';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import CloseIcon from '../assets/icons/closeIcon';
import CustomBackdrop from '../components/customBackDrop';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Button from '../components/shared-ui/button';

const RestuarantDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'RestuarantDetails'>) => {
  const {name, phone, email, address, image_path, token, id, clientId} =
    route.params;

  const [products, setProducts] = useState<product[]>([]);
  const [productsCopy, setProductsCopy] = useState<product[]>([]);
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [category, setCategory] = useState<Icategories>();
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [chosenFood, setChosenFood] = useState<product>();
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['60%', '90%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // Function to close modal.
  const handleClosePress = () => bottomSheetModalRef.current?.close();

  // params
  const params = new URLSearchParams({
    token,
    client_id: id.toString(),
  });

  useEffect(() => {
    // set loading true
    setLoading(true);
    axios
      .get(`${API_URL}/fetch-products?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          console.log(response.data.status);
        } else {
          setProducts(response.data.data);
          setProductsCopy(response.data.data);
          setCategories(response.data.categories);
          setCategory(response.data.categories[0]);
        }
      })
      .catch(error => {
        console.log(error);
      });
    // set loading true
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  useEffect(() => {
    //filter products when category id changes
    setProducts(
      productsCopy.filter(
        productCopy => productCopy.category_id === category?.id,
      ),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category?.id]);

  // onRefresh function.
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    axios
      .get(`${API_URL}/fetch-products?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          console.log(response.data.status);
        } else {
          setProducts(response.data.data);
          setProductsCopy(response.data.data);
          setCategories(response.data.categories);
          setCategory(response.data.categories[0]);
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
  return (
    <GestureHandlerRootView style={styles.gestureHandlerContainer}>
      <BottomSheetModalProvider>
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
            <Image
              source={{
                uri: `${IMAGE_BASE_URL}/${image_path}`,
              }}
              style={styles.restuarantImage}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
                    <Text style={styles.infoText}>
                      {' '}
                      {phone || '0712345678'}
                    </Text>
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
                    <Text style={styles.infoText}>
                      {' '}
                      {email || '0712345678'}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.categoryContainer}>
                <Text style={styles.categoryText}>Categories</Text>
                <ScrollView
                  style={styles.categoryScrollViewContainer}
                  contentContainerStyle={
                    styles.categoryScrollViewContentContainer
                  }
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
                {loading === true && products && products?.length < 1 ? (
                  <>
                    {list.map(item => (
                      <View style={styles.menuContentWrapper} key={item.id}>
                        <View>
                          <Shimmering wrapperStyle={styles.menuImage} />
                        </View>
                        <View style={styles.menuContent}>
                          <View style={styles.menuContentInfo}>
                            <Shimmering
                              wrapperStyle={styles.foodNameShimmering}
                            />
                            <View style={styles.menuContentShimmeringMargin} />
                            <Shimmering
                              wrapperStyle={styles.foodPriceShimmering}
                            />
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
                        productItem: {
                          id: number;
                          name: string;
                          category_id: number;
                          description: string;
                          in_stock: string;
                          cost: number;
                          image_path: string;
                        },
                        index: React.Key | null | undefined,
                      ) => (
                        <TouchableOpacity
                          key={index}
                          style={styles.menuContentWrapper}
                          onPress={() => {
                            // navigation.navigate('FoodDetails', {
                            //   product: {...productItem, restuarantId: id},
                            // })
                            setChosenFood(productItem);
                            handlePresentModalPress();
                          }}>
                          <View>
                            <Image
                              source={{
                                uri: `${IMAGE_BASE_URL}/${productItem.image_path}`,
                              }}
                              style={styles.menuImage}
                            />
                          </View>
                          <View style={styles.menuContent}>
                            <View style={styles.menuContentInfo}>
                              <Text style={styles.foodName}>
                                {productItem.name}
                              </Text>
                              <Text style={styles.foodPrice}>
                                KES {productItem.cost}
                              </Text>
                              <Text
                                style={styles.foodDescription}
                                numberOfLines={2}>
                                {productItem.description}
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
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
            style={styles.bottomSheetContainer}
            backdropComponent={CustomBackdrop}
            footerComponent={() => (
              <View style={styles.bottomSheetCartButtonContainer}>
                <Button
                  title={'Add to cart  • KES ' + chosenFood?.cost}
                  buttonType="orange"
                  textType="labelButtonOrange"
                  accessibilityLabel="Start Ordering"
                />
              </View>
            )}>
            <View style={styles.bottomSheetContentContainer}>
              <View>
                <ImageBackground
                  source={{
                    uri: `${IMAGE_BASE_URL}/${chosenFood?.image_path}`,
                  }}
                  resizeMode="cover"
                  style={styles.productBackgroundImage}>
                  <TouchableOpacity
                    onPress={handleClosePress}
                    style={styles.bottomSheetCloseIconContainer}>
                    <CloseIcon fill={theme.colors.black} />
                  </TouchableOpacity>
                </ImageBackground>
              </View>
              <BottomSheetScrollView>
                <Text
                  textType="appBarTitle"
                  style={styles.bottomSheetProductName}>
                  {chosenFood?.name}
                </Text>
                <Text
                  textType="appBarTitle"
                  style={{color: theme.colors.primary}}>
                  KES {chosenFood?.cost}
                </Text>
                <Text style={styles.bottomSheetProductDescription}>
                  {chosenFood?.description}
                </Text>
              </BottomSheetScrollView>
            </View>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gestureHandlerContainer: {
    flex: 1,
  },
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
  bottomSheetContainer: {
    marginHorizontal: 0,
  },
  bottomSheetContentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  bottomSheetCartButtonContainer: {alignItems: 'center', marginVertical: 20},
  productBackgroundImage: {
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    borderColor: theme.colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
  },
  bottomSheetCloseIconContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: theme.colors.white,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: theme.boxShadowAndroid.elevation,
    shadowColor: theme.boxShadowAndroid.shadowColor,
  },
  bottomSheetProductName: {marginVertical: 5},
  bottomSheetProductDescription: {opacity: 0.57, marginVertical: 5},
});
export default RestuarantDetails;
