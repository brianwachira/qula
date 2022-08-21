import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dimensions, StyleSheet, View} from 'react-native';
import LoginForm from '../../components/loginForm';
import * as RootNavigation from '../../navigation/rootNavigation';

const styles = StyleSheet.create({
  formikContainer: {
    height:
      Dimensions.get('screen').height - Dimensions.get('screen').height / 3,
  },
});

// formik initial values
const initialValues = {
  email: '',
  password: '',
};

//formik validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login = () => {
  // onsubmit function
  const onSubmit = (values: any) => {
    const user = {
      email: values.email,
      otp: 12345,
    };
    //console.log(values);
    RootNavigation.navigate('Otp' as never, user as never);
  };

  return (
    <View style={styles.formikContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({handleSubmit}) => <LoginForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default Login;
