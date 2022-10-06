import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EditProfileForm from '../../components/editProfileForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';
import ArrowLeftIcon from '../../assets/icons/arrowLeftIcon';
import Text from '../../components/shared-ui/text';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 30,
    marginTop: 10,
  },
  backIcon: {
    marginRight: 10,
  },
  presssableFlex: {
    flex: 1,
  },
  backButtonContainer: {
    zIndex: 30,
  },
  screenTitle: {top: -29},
});

// validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().required('Email is required'),
  phone: Yup.string().min(2, 'Too short!').required('Phone is required'),
});

const EditProfile = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'EditProfile'>) => {
  // initial values for profile form
  const initialValues = {
    name: 'Makena Mbugua',
    email: 'makenambugua@gmail.com',
    phone: '+254712345678',
  };

  // on submit function
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        {/* this wrapper dismisses keyboard on press */}
        <Pressable onPress={Keyboard.dismiss} style={styles.presssableFlex}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.navigate('HomeTab', {screen: 'Profile'})}>
            <ArrowLeftIcon width={35} height={35} style={styles.backIcon} />
          </TouchableOpacity>
          <Text style={styles.screenTitle} textAlign="center">
            Edit Profile
          </Text>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {({handleSubmit}) => <EditProfileForm onSubmit={handleSubmit} />}
          </Formik>
        </Pressable>
      </SafeAreaView>
    </>
  );
};

export default EditProfile;
