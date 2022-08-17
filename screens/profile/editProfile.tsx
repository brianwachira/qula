import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import EditProfileForm from '../../components/editProfileForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types';
import ArrowLeftIcon from '../../assets/icons/arrowLeftIcon';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginHorizontal: 40,
    marginTop: StatusBar.currentHeight,
  },
  backIcon: {
    marginRight: 10,
  },
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
        <Pressable onPress={Keyboard.dismiss} style={{flex: 1}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeftIcon style={styles.backIcon} />
          </TouchableOpacity>
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
