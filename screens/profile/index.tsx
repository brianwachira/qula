import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import ChevronLeftIcon from '../../assets/icons/chevronLeftIcon';
import UserCircleIcon from '../../assets/icons/userCircleIcon';
import Text from '../../components/shared-ui/text';
import theme from '../../styles/themes';
import {RootStackParamList} from '../../types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: 100,
  },
  scrollView: {
    marginHorizontal: 40,
  },
  profileCard: {
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  profileContent: {
    width: '65%',
  },
  textProfileLabel: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 15,
  },
  textProfileName: {
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
    marginBottom: 5,
  },
  textProfileDetails: {
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 18,
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
  },
});

const Profile = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Profile'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.textProfileLabel}>Personal Details</Text>
        <TouchableOpacity
          style={styles.profileCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('EditProfile')}>
          {/* icon goes here */}
          <UserCircleIcon width={100} height={100} fill={theme.colors.icon} />
          <View style={styles.profileContent}>
            <Text style={styles.textProfileName}>Makena Mbugua</Text>
            <Text style={styles.textProfileDetails}>
              makenambugua@gmail.com
            </Text>
            <Text style={styles.textProfileDetails}>+254712345678</Text>
            <Text style={styles.textProfileDetails}>
              Muindi Mbingu Street, 716
            </Text>
          </View>
        </TouchableOpacity>
        {/* the rest of the cards */}
        <TouchableOpacity style={styles.listCard} activeOpacity={0.8}>
          <Text style={styles.textProfileName}>Orders</Text>
          {/* chevron icon here */}
          <ChevronLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listCard} activeOpacity={0.8}>
          <Text style={styles.textProfileName}>FAQ</Text>
          {/* chevron icon here */}
          <ChevronLeftIcon />
        </TouchableOpacity>
        <TouchableOpacity style={styles.listCard} activeOpacity={0.8}>
          <Text style={styles.textProfileName}>Help</Text>
          {/* chevron icon here */}
          <ChevronLeftIcon />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
