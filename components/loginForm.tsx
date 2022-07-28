import React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../styles/themes';
import Button from './shared-ui/button';
import FormikTextInput from './shared-ui/formikTextInput';
import Text from './shared-ui/text';

const styles = StyleSheet.create({
  onBoardingInput: {
    color: theme.colors.black,
    borderBottomColor: theme.colors.black,
    borderBottomWidth: 1,
    height: 40,
  },
  label: {
    textAlign: 'center',
    marginTop: 14,
    marginBottom: 10,
  },
  formContainer: {
    flex: 0.85,
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  inputContainer: {
    marginBottom: 40,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

const LoginForm = ({onSubmit}: {onSubmit: any}) => {
  return (
    <>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {/* email */}
          <Text textType="labelInput">Email Address</Text>
          <FormikTextInput
            name="email"
            textContentType="emailAddress"
            autoComplete="email"
            style={styles.onBoardingInput}
          />
        </View>
        {/* password */}
        <View style={styles.inputContainer}>
          <Text textType="labelInput">Password</Text>
          <FormikTextInput
            name="password"
            textContentType="password"
            autoComplete="password"
            style={styles.onBoardingInput}
            secureTextEntry
          />
        </View>

        {/* forgot password link */}
        <Text color="primary" textType="labelLink">
          Forgot Password{' '}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title="Login"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Login"
        />
      </View>
    </>
  );
};

export default LoginForm;
