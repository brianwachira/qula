import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import LoginForm from '../../components/loginForm';
import * as RootNavigation from '../../navigation/rootNavigation';
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
    console.log(values);
    RootNavigation.navigate('Home' as never, {} as never);
  };

  return (
    <View style={{flex: 1}}>
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
