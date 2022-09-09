import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowLeftIcon from '../assets/icons/arrowLeftIcon';
import ResultsCard from '../components/resultsCard';
import Text from '../components/shared-ui/text';
import TextInput from '../components/shared-ui/textInput';
import {foods} from '../mockdata';
import theme from '../styles/themes';
import {Imerchants, RootStackParamList} from '../types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: theme.colors.tab,
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
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  separator: {
    height: 15,
  },
  marginRight0: {
    marginRight: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  cardsContainer: {
    backgroundColor: '#F9F9F9',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    paddingHorizontal: 40,
    flex: 1,
  },
  backIcon: {marginRight: 10},
});
const ItemSeparator = () => <View style={styles.separator} />;

const SearchResults = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SearchResults'>) => {
  const [searchedMerchants, setSearchedMerchants] = useState<Imerchants[]>();

  const {token, clientId, merchants} = route.params;
  // create a ref for search bar
  const searchBarRef = useRef();

  useEffect(() => {
    // focus on search bar on screen enter
    searchBarRef?.current?.focus();
  }, []);

  // handle change function
  function onChangeText(text: string): void {
    if (text.length < 1) {
      setSearchedMerchants([]);
    } else {
      setSearchedMerchants(
        merchants.filter(merchant => merchant.name.includes(text)),
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon style={styles.backIcon} width={40} height={40} />
        </TouchableOpacity>
        <TextInput
          style={{
            color: theme.colors.black,
            width: Dimensions.get('screen').width - 100,
          }}
          selectionColor={theme.colors.black}
          placeholder="Search"
          placeholderTextColor={theme.colors.black}
          ref={searchBarRef}
          onChangeText={text => onChangeText(text)}
        />
      </View>
      {!searchedMerchants || searchedMerchants.length < 1 ? (
        <View style={styles.cardsContainer}>
          <Text>Search for any Restuarant</Text>
        </View>
      ) : (
        <View style={styles.cardsContainer}>
          <FlatList
            ItemSeparatorComponent={ItemSeparator}
            data={searchedMerchants}
            renderItem={({item, index}) => (
              <ResultsCard
                item={item}
                onPress={() =>
                  //navigate to restuarant details
                  navigation.navigate('RestuarantDetails', {
                    token,
                    clientId,
                    ...item,
                  })
                }
                stylesCustom={
                  (index % 2 === 1 || index === foods.length - 1) &&
                  styles.marginRight0
                }
              />
            )}
            keyExtractor={(item, index) => `restaurant-${index}`}
            numColumns={2}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchResults;
