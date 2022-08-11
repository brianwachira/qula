import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
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
import TextInput from '../components/shared-ui/textInput';
import {localRestaurants} from '../mockdata';
import theme from '../styles/themes';
import {RootStackParamList} from '../types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: StatusBar.currentHeight,
    flex: 1,
    marginHorizontal: 40,
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
});
const ItemSeparator = () => <View style={styles.separator} />;

const SearchResults = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'SearchResults'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          backgroundColor: '#EFEEEE',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20,
          borderRadius: 30,
          paddingHorizontal: 15,
          paddingVertical: 5,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeftIcon style={{marginRight: 10}} />
        </TouchableOpacity>
        <TextInput
          style={{
            color: theme.colors.black,
            width: Dimensions.get('screen').width - 100,
          }}
          selectionColor={theme.colors.black}
          placeholder="Search"
          placeholderTextColor={theme.colors.black}
        />
      </View>
      <FlatList
        ItemSeparatorComponent={ItemSeparator}
        data={localRestaurants}
        renderItem={({item}) => (
          <ResultsCard item={item} onPress={() => console.log('pressed')} />
        )}
        keyExtractor={(item, index) => `restaurant-${index}`}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SearchResults;
