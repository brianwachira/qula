import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import SearchIcon from '../assets/icons/searchIcon';
import CategoriesCard from '../components/categoriesCard';
import RestuarantCard from '../components/restuarantCard.';
import Text from '../components/shared-ui/text';
import TextInput from '../components/shared-ui/textInput';
import {categoriesData, localRestaurants} from '../mockdata';
import theme from '../styles/themes';
import {RootStackParamList} from '../types';

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
  },
});

const ItemSeparator = () => <View style={styles.separator} />;
const ItemSeparator2 = () => <View style={styles.separator} />;
const Home = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Home'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.title}>
          <Text textType="empty">Delicious</Text>
          <Text textType="empty">food for you</Text>
        </View>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
            style={{
              color: theme.colors.black,
            }}
            placeholder="Search"
            placeholderTextColor={theme.colors.black}
          />
        </View>

        <FlatList
          data={categoriesData}
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
          data={localRestaurants}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({item}) => (
            <RestuarantCard
              item={item}
              onPress={() => console.log('pressed')}
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
