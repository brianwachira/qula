import React, {useState} from 'react';
import axios, {AxiosResponse} from 'axios';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Dimensions, StyleSheet, View} from 'react-native';
import LoginForm from '../../components/loginForm';
import * as RootNavigation from '../../navigation/rootNavigation';
import {API_URL} from '@env';
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
  const [loading, setLoading] = useState<boolean>(false);
  // onsubmit function
  const onSubmit = (values: any) => {
    //setLoading true
    setLoading(true);
    const params = new URLSearchParams({
      password: values.password,
      phone: values.email,
    }).toString();

    axios.post(`${API_URL}/login?${params}`).then((response: AxiosResponse) => {
      if (response.data.status === false) {
        console.log(response.data);

        //that means something is wrong
        console.log(response.data.status_message);
      } else {
        //console.log(response.data.data.client_id);

        console.log(response.data.otp);
        const user = {
          phone: response.data.data.msisdn,
          otp: response.data.otp,
          authKey: response.data.data.auth_key,
          userId: response.data.data.id,
          clientId: response.data.data.client_id,
        };
        // move to otp screen
        RootNavigation.navigate('Otp' as never, user as never);
      }
      //setLoading false
      setLoading(false);
    });
  };

  return (
    <View style={styles.formikContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({handleSubmit}) => (
          <LoginForm loading={loading} onSubmit={handleSubmit} />
        )}
      </Formik>
    </View>
  );
};

export default Login;
