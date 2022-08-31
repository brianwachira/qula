import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import Text from '../components/shared-ui/text';
import {Icategories, RootStackParamList} from '../types/types';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import theme from '../styles/themes';
import {foods} from '../mockdata';
import Map from '../components/map';

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
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    backgroundColor: theme.colors.tab,
    borderRadius: 5,
    marginRight: 7,
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
  },
  categoryContainer: {
    marginTop: 12,
  },
});
const RestuarantDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'RestuarantDetails'>) => {
  //const [mapActive, setMapActive] = useState(false);
  const {
    //categories,
    //coordinates,
    //image_url,
    //name,
    //price,
    //rating,
    //review_count,
    id,
    name,
    phone,
    email,
    address,
    image,
  } = route.params;

  const [categories, setCategories] = useState<Icategories[]>([]);

  return (
    <View style={styles.container}>
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={!mapActive ? 'light-content' : 'dark-content'}
      /> */}
      {/* Back icon */}
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}
        activeOpacity={0.9}>
        <ArrowLeftIcon width={35} height={35} />
      </TouchableOpacity>
      <View style={styles.mapImageWrpper}>
        {/* image or map wrapper */}
        {/* {mapActive ? (
          <Map coordinates={coordinates} title={name} />
        ) : (
        )} */}
        <Image source={{uri: image}} style={styles.restuarantImage} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            {/* toggle map icon */}
            <TouchableOpacity
            //onPress={() => setMapActive(!mapActive)}
            >
              <Entypo name="location" size={24} color={`${'#000'}`} />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
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
                  name="dollar"
                  size={16}
                  color={theme.colors.primary}
                />
                <Text style={styles.infoText}>• KES</Text>
              </View>
            </View>
          </View>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>Categories</Text>
            {categories.map((category, index) => (
              <Text key={index} style={styles.textCategory}>
                <Text style={{color: theme.colors.primary}}>•</Text> {category}
              </Text>
            ))}
          </View>
          {/* menu items */}
          <View style={styles.menuContainer}>
            {foods?.map(
              (
                food: {
                  id: string;
                  title: string;
                  price: number;
                  description: string;
                  image: string;
                },
                index: React.Key | null | undefined,
              ) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuContentWrapper}
                  onPress={() =>
                    navigation.navigate('FoodDetails', {food: food})
                  }>
                  <View>
                    <Image
                      source={{uri: food.image}}
                      style={styles.menuImage}
                    />
                  </View>
                  <View style={styles.menuContent}>
                    <View style={styles.menuContentInfo}>
                      <Text style={styles.foodName}>{food.title}</Text>
                      <Text style={styles.foodPrice}>${food.price}</Text>
                      <Text style={styles.foodDescription} numberOfLines={2}>
                        {food.description}
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
