import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import CategoriesCard from '../components/categoriesCard';
import RestuarantCard from '../components/restuarantCard.';
import Text from '../components/shared-ui/text';
import {categoriesData, localRestaurants} from '../mockdata';
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
        {/* <View style={{height: 120}}>
          <Text>Searchbar here</Text>
        </View> */}

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
