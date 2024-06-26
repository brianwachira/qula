import {IMAGE_BASE_URL} from '@env';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import ChevronLeftIcon from '../../assets/icons/chevronLeftIcon';
import Text from '../../components/shared-ui/text';
import {useStorage} from '../../hooks/useStorage';
import theme from '../../styles/themes';
import {RootStackParamList} from '../../types/types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: 20,
  },
  scrollView: {
    marginHorizontal: 30,
    margin: -12,
  },
  scrollViewContentContainer: {
    padding: 12,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: theme.borderRadius.button,
    marginRight: 10,
  },
  profileCard: {
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'row',
    padding: 15,
    ...theme.boxShadowAndroid,
  },
  profileContent: {
    width: '100%',
  },
  textProfileLabel: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 15,
  },
  textProfileName: {
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 5,
  },
  textProfileDetails: {
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 14,
    opacity: 0.5,
    marginBottom: 5,
  },
  listCard: {
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
    marginTop: 27,
    alignItems: 'center',
    ...theme.boxShadowAndroid,
  },
});

const Profile = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'ProfileStack'>) => {
  const [user, setUser] = useStorage('user');

  // function to logout user
  const logout = () => {
    setUser(null);
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContentContainer}>
        <Text style={styles.textProfileLabel}>Personal Details</Text>
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('EditProfile')}>
          {/* user image */}
          <Image
            source={{uri: `${IMAGE_BASE_URL}/${user.image}`}}
            style={styles.profileImage}
          />
          <View style={styles.profileContent}>
            <Text style={styles.textProfileName}>{user.names}</Text>
            <Text style={styles.textProfileName}>{user.username}</Text>
            <Text style={styles.textProfileDetails}>{user.email}</Text>
            <Text style={styles.textProfileDetails}>{user.phone}</Text>
          </View>
        </TouchableOpacity>
        {/* the rest of the cards */}
        <TouchableOpacity
          style={styles.listCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('HomeTab', {screen: 'Orders'})}>
          <Text textType="labelLink">Orders</Text>
          {/* chevron icon here */}
          <ChevronLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listCard} activeOpacity={0.8}>
          <Text textType="labelLink">FAQ</Text>
          {/* chevron icon here */}
          <ChevronLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listCard} activeOpacity={0.8}>
          <Text textType="labelLink">Help</Text>
          {/* chevron icon here */}
          <ChevronLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listCard}
          activeOpacity={0.8}
          onPress={logout}>
          <Text textType="labelLink">Logout</Text>
          {/* chevron icon here */}
          <ChevronLeftIcon />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
