import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchIcon from '../assets/icons/searchIcon';
import RestuarantCard from '../components/restuarantCard';
import Text from '../components/shared-ui/text';
import TextInput from '../components/shared-ui/textInput';
import {useStorage} from '../hooks/useStorage';
import theme from '../styles/themes';
import {Imerchants, RootStackParamList} from '../types/types';
import hmac256 from 'crypto-js/hmac-sha256';
import {encode} from '../utils/encoder';
import axios from 'axios';
import {API_URL} from '@env';
import ShimmeringRestuarantCard from '../components/shimmeringRestuarantCard';
import {list} from '../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    marginLeft: 40,
  },
  separator: {
    height: 15,
  },
  separator2: {
    width: 40,
    height: 20,
  },
  title: {
    marginBottom: 15,
  },
  searchBar: {
    backgroundColor: '#EFEEEE',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 40,
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 10,
  },
  categoriesContainerStyle: {
    padding: 12,
  },
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
  flatlistContainer: {
    margin: -12,
    paddingBottom: 20,
  },
  contentScrollView: {
    flexGrow: 0.75,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  // user
  const [user] = useStorage('user');
  const [merchants, setMerchants] = useState<Imerchants[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // create a cipher text
  const ciphertext: string = hmac256(
    user.userId || 'fddd',
    user.authKey || 'sdfdf',
  ).toString();

  // encoded cipher text
  const encodedCipher = encode(ciphertext);

  // params
  const params = new URLSearchParams({
    token: encodedCipher,
    client_id: user.clientId,
    msisdn: user.phone,
  });

  /**
   * useEffect to fetch merchants
   */

  useEffect(() => {
    //setLoading true
    setLoading(true);
    axios
      .get(`${API_URL}/fetch-merchants?${params}`)
      .then(response => {
        if (response.data.status === false) {
          console.log(response.data.status);
        } else {
          setMerchants(response.data?.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
    //setLoading false
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // function to navigate to search results screen
  const onPress = () => {
    navigation.navigate('SearchResults', {
      token: encodedCipher,
      clientId: user.clientId,
      merchants: merchants,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.title}>
          <Text textType="empty">Delicious</Text>
          <Text textType="empty">food for you</Text>
        </View>
        {/* SEARCH BAR */}
        <TouchableOpacity style={styles.searchBar} onPress={onPress}>
          <SearchIcon />
          <TextInput
            style={{
              color: theme.colors.black,
              width: Dimensions.get('screen').width - 100,
            }}
            placeholder="Search"
            placeholderTextColor={theme.colors.black}
            editable={false}
          />
        </TouchableOpacity>
        <ScrollView style={styles.contentScrollView}>
          {loading === true || merchants.length < 1 ? (
            <>
              <FlatList
                key={'#'}
                style={styles.flatlistContainer}
                contentContainerStyle={styles.categoriesContainerStyle}
                data={list}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={() => <ShimmeringRestuarantCard />}
                keyExtractor={item => `shimmer-${item.id}`}
                numColumns={2}
              />
            </>
          ) : (
            <>
              <FlatList
                key={'#'}
                style={styles.flatlistContainer}
                contentContainerStyle={styles.categoriesContainerStyle}
                data={merchants}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({item}) => (
                  <RestuarantCard
                    item={item}
                    onPress={() =>
                      navigation.navigate('RestuarantDetails', {
                        token: encodedCipher,
                        clientId: user.clientId,
                        id: item.id,
                        name: item.name,
                        phone: item.phone,
                        email: item.email,
                        address: item.address,
                        image_path: item.image_path,
                      })
                    }
                  />
                )}
                keyExtractor={(item, index) => `restaurant-${index}`}
                numColumns={2}
              />
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;
