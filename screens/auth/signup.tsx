import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {ScrollView, StyleSheet, View} from 'react-native';
import SignupForm from '../../components/signupForm';
import Button from '../../components/shared-ui/button';
import axios, {AxiosResponse} from 'axios';
import {API_URL} from '@env';
import ModalPopupResponse from '../../components/shared-ui/modalPopupResponse';
import * as Sentry from '@sentry/react-native';

// formik initial values
const initialValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
};

// formik validation schema
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email(),
  phone: Yup.string().required('Phone number is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const toggleModal = () => setModalVisible(!modalVisible);
  // onsubmit function
  const onSubmit = (values: any) => {
    //setLoading true
    setLoading(true);
    const params = new URLSearchParams({
      name: values.name,
      ...(values.email && {email: values.email}),
      phone: values.phone,
      password: values.password,
    });
    axios
      .post(`${API_URL}/sign-up?${params}`)
      .then((response: AxiosResponse) => {
        if (response.data.status === false) {
          setErrorMessage(response.data.status_message);
          toggleModal();
        } else {
          setSuccessMessage(response.data.status_message);
          toggleModal();
        }
        console.log(response.data);
        //setLoading false
        setLoading(false);
      })
      .catch(error => {
        Sentry.captureException('Signup Error: ' + error);
        Sentry.captureException(
          'Signup Error Description: ' + error.response.data.message,
        );
        //setLoading false
        setLoading(false);
      });
  };

  // Function to toggle modal and navigate back upon successfull addition of users
  const handleModalClose = () => {
    toggleModal();

    //navigation.goBack();
  };

  return (
    <View style={styles.formikContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({handleSubmit}) => (
          <>
            <ScrollView
              style={styles.scrollViewContainer}
              contentContainerStyle={styles.scrollViewContentContainer}>
              <SignupForm />
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => handleSubmit()}
                title="Sign Up"
                buttonType="orange"
                textType="labelButtonOrange"
                accessibilityLabel="Sign Up"
                loading={loading}
              />
            </View>
          </>
        )}
      </Formik>
      <ModalPopupResponse
        errorMessage={errorMessage}
        toggleModal={toggleModal}
        handleModalClose={handleModalClose}
        visible={modalVisible}
        successMessage={successMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formikContainer: {
    flex: 0.84,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  scrollViewContentContainer: {
    paddingVertical: 20,
  },
});
export default Signup;
