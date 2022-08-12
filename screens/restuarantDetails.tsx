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
import {RootStackParamList} from '../types';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Foundation from 'react-native-vector-icons/Foundation';
import theme from '../styles/themes';
import {foods} from '../mockdata';

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
    paddingVertical: 25,
    paddingHorizontal: 25,
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
    fontSize: 23,
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
    borderBottomColor: theme.colors.primary,
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
    height: 64, //h-16
    width: 64, //w-16
    borderRadius: 20, //rounded-lg
  },
  backIconContainer: {
    position: 'absolute',
    top: 36, //top-9
    left: 16, //left-4
    zIndex: 30,
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: 30,
    padding: 5,
    justifyContent: 'center',
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
});
const RestuarantDetails = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'RestuarantDetails'>) => {
  const [mapActive, setMapActive] = useState(false);
  const {
    categories,
    //coordinates,
    image_url,
    name,
    price,
    rating,
    review_count,
  } = route.params.restuarant;

  return (
    <View style={styles.container}>
      {/* Back icon */}
      <TouchableOpacity
        style={styles.backIconContainer}
        onPress={() => navigation.goBack()}>
        <ArrowLeftIcon />
      </TouchableOpacity>
      <View style={styles.mapImageWrpper}>
        {/* image or map wrapper */}
        {mapActive ? (
          <Text>Map</Text>
        ) : (
          <Image source={{uri: image_url}} style={styles.restuarantImage} />
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>{name}</Text>
            {/* toggle map icon */}
            <TouchableOpacity onPress={() => setMapActive(!mapActive)}>
              <Entypo
                name="location"
                size={24}
                color={`${mapActive ? theme.colors.primary : '#000'}`}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.info}>
              <View style={styles.infoItem}>
                <AntDesign name="star" size={12} color="#FFC238" />
                <Text style={styles.infoText}>
                  {rating} • ({review_count})
                </Text>
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
                <Text style={styles.infoText}>• {price}</Text>
              </View>
            </View>
          </View>
          <View>
            <Text style={styles.categoryText}>Categories</Text>
            {categories.map((category, index) => (
              <Text key={index}>
                <Text style={{color: theme.colors.primary}}>•</Text>
                {category}
              </Text>
            ))}
          </View>
          {/* menu items */}
          <View style={styles.menuContainer}>
            {foods?.map(
              (
                food: {
                  title: string;
                  price: number;
                  description: string;
                  image: string;
                },
                index: React.Key | null | undefined,
              ) => (
                <View key={index} style={styles.menuContentWrapper}>
                  <View style={styles.menuContent}>
                    <View style={styles.menuContentInfo}>
                      <Text>{food.title}</Text>
                      <Text>{food.price}</Text>
                      <Text>{food.description}</Text>
                    </View>
                  </View>
                  <View>
                    <Image
                      source={{uri: food.image}}
                      style={styles.menuImage}
                    />
                  </View>
                </View>
              ),
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RestuarantDetails;
