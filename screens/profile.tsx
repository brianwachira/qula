import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import UserCircleIcon from '../assets/icons/userCircleIcon';
import Text from '../components/shared-ui/text';
import theme from '../styles/themes';
import {RootStackParamList} from '../types';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 70,
    marginHorizontal: 40,
  },
  profileCard: {
    borderRadius: 20,
    backgroundColor: theme.colors.white,
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    ...theme.boxShadowAndroid,
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
});

const Profile = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Profile'>) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textProfileName}>Personal Details</Text>
      <TouchableOpacity style={styles.profileCard}>
        {/* icon goes here */}
        <UserCircleIcon width={100} height={100} fill={theme.colors.icon} />
        <View>
          <Text style={styles.textProfileName}>Makena Mbugua</Text>
          <Text style={styles.textProfileDetails}>makenambugua@gmail.com</Text>
          <Text style={styles.textProfileDetails}>+254712345678</Text>
          <Text style={styles.textProfileDetails}>
            Muindi Mbingu Street, 716
          </Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
