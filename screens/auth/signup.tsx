import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StyleSheet, View} from 'react-native';
import SignupForm from '../../components/signupForm';

const styles = StyleSheet.create({
  formikContainer: {
    flex: 0.9,
  },
});

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
  const [loading, setLoading] = useState<boolean>(false);
  // onsubmit function
  const onSubmit = (values: any) => {
    //setLoading true
    setLoading(true);
    console.log(values);
    //setLoading false
    setLoading(false);
  };

  return (
    <View style={styles.formikContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({handleSubmit}) => (
          <SignupForm loading={loading} onSubmit={handleSubmit} />
        )}
      </Formik>
    </View>
  );
};

export default Signup;
