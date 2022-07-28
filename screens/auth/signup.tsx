import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import SignupForm from '../../components/signupForm';

// formik initial values
const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

// formik validation schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const Signup = () => {
  // onsubmit function
  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <View style={{flex: 1}}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({handleSubmit}) => <SignupForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

export default Signup;
