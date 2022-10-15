import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import EditProfileForm from '../../components/editProfileForm';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/types';
import ArrowLeftIcon from '../../assets/icons/arrowLeftIcon';
import Text from '../../components/shared-ui/text';
import theme from '../../styles/themes';
import {useStorage} from '../../hooks/useStorage';
import {API_URL, IMAGE_BASE_URL} from '@env';
import axios from 'axios';
import Button from '../../components/shared-ui/button';

// validation schema
const validationSchema = Yup.object().shape({
  names: Yup.string().required('Name is required'),
  username: Yup.string().required('Username is required'),
  phone: Yup.string().required('Phone number is required'),
  email: Yup.string().email().required('Email is required'),
  image: Yup.object().nullable(),
});

const EditProfile = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'EditProfile'>) => {
  const [user] = useStorage('user');
  const [loading, setLoading] = useState<boolean>(false);
  // initial values for profile form
  const initialValues = {
    names: user.names,
    username: user.username,
    phone: user.phone,
    email: user.email,
    image: `${IMAGE_BASE_URL}/${user.image}`,
  };

  // on submit function
  const onSubmit = (values: any) => {
    const formData = new FormData();
    values.image.uri &&
      formData.append('photo', {
        uri: values.image.uri,
        name: values.image.fileName,
        type: values.image.type,
      });
    formData.append('user_id', user.userId);
    formData.append('names', values.names);
    formData.append('username', values.username);
    formData.append('msisdn', values.phone);
    formData.append('email', values.email);

    //update profile details
    axios
      .post(`${API_URL}/update-profile`, formData, {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      })
      .then(response => {
        if (response.data.status === false) {
          ToastAndroid.showWithGravity(
            response.data.status_message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        } else {
          ToastAndroid.showWithGravity(
            response.data.status_message,
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }
        // set loading to false
        setLoading(false);
      })
      .catch(error => {
        ToastAndroid.showWithGravity(
          error.response.data,
          ToastAndroid.LONG,
          ToastAndroid.CENTER,
        );
        // set loading to false
        setLoading(false);
      });
    // set loading to false
    setLoading(false);
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={theme.colors.tab}
        />
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {({handleSubmit}) => (
            <>
              <View style={styles.navigationHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <ArrowLeftIcon
                    width={35}
                    height={35}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
                <Text textType="labelLink">Update Profile</Text>
                <TouchableOpacity onPress={handleSubmit}>
                  <Text textType="labelLink">Save</Text>
                </TouchableOpacity>
              </View>
              <ScrollView
                style={styles.scrollViewContainer}
                contentContainerStyle={styles.scrollViewContentContainer}
                showsVerticalScrollIndicator={false}>
                <EditProfileForm />
              </ScrollView>
              <View style={styles.formButtonContainer}>
                <Button
                  title="Edit Profile"
                  onPress={handleSubmit}
                  buttonType="orange"
                  textType="labelButtonOrange"
                  accessibilityLabel="EditProfile"
                  loading={loading}
                />
              </View>
            </>
          )}
        </Formik>
      </SafeAreaView>
    </>
  );
};

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
  navigationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  scrollViewContainer: {
    marginVertical: 20,
    margin: -12,
    flexGrow: 1,
  },
  scrollViewContentContainer: {
    padding: 12,
  },
  formButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
});

export default EditProfile;
