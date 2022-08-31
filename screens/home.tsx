import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchIcon from '../assets/icons/searchIcon';
import CategoriesCard from '../components/categoriesCard';
import RestuarantCard from '../components/restuarantCard';
import Text from '../components/shared-ui/text';
import TextInput from '../components/shared-ui/textInput';
import {useStorage} from '../hooks/useStorage';
import theme from '../styles/themes';
import {Icategories, Imerchants, RootStackParamList} from '../types/types';
import hmac256 from 'crypto-js/hmac-sha256';
import {encode} from '../utils/encoder';
import axios, {AxiosResponse} from 'axios';
import {API_URL} from '@env';

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
    paddingLeft: 4,
    paddingVertical: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const ItemSeparator2 = () => <View style={styles.separator} />;
const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  // user
  const [user, setUser] = useStorage('user');
  const [categories, setCategories] = useState<Icategories[]>([]);
  const [merchants, setMerchants] = useState<Imerchants[]>([]);

  // create a cipher text
  const ciphertext: string = hmac256(
    user.userId.toString(),
    user.authKey,
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
   * useEffect to fetch merchants and categories
   */

  useEffect(() => {
    Promise.all([
      axios.get(`${API_URL}/fetch-categories?${params}`),
      axios.get(`${API_URL}/fetch-merchants?${params}`),
    ]).then((responses: AxiosResponse[]) => {
      responses[0].data.status === true &&
        setCategories(responses[0].data?.data);
      responses[0].data.status === true &&
        setMerchants(responses[0].data?.data);
    });
  });
  // function to navigate to search results screen
  const onPress = () => {
    navigation.navigate('SearchResults');
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

        <FlatList
          contentContainerStyle={styles.categoriesContainerStyle}
          data={categories}
          ItemSeparatorComponent={ItemSeparator2}
          renderItem={({item}) => (
            <CategoriesCard
              item={item}
              onPress={() => console.log('pressed')}
            />
          )}
          keyExtractor={(item, index) => `category-${index}`}
          horizontal
        />
        <View style={{marginVertical: 10}} />
        <FlatList
          contentContainerStyle={styles.categoriesContainerStyle}
          data={merchants}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item}) => (
            <RestuarantCard
              item={item}
              onPress={() =>
                navigation.navigate('RestuarantDetails', {restuarant: item})
              }
            />
          )}
          keyExtractor={(item, index) => `restaurant-${index}`}
          horizontal
          numColumns={1}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
