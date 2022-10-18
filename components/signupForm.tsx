import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import EyeIcon from '../assets/icons/eyeIcon';
import EyeIconClosed from '../assets/icons/eyeIconClosed';
import theme from '../styles/themes';
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
    //height: Dimensions.get('window').height - Dimensions.get('window').height / 2,
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  inputContainer: {
    marginBottom: 20,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconPassword: {
    position: 'absolute',
    right: 0,
    bottom: 10,
  },
});

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //function to toggle password
  const togglePassword = () => setShowPassword(!showPassword);

  //function to toggle confirm password
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          {/* email */}
          <FormikTextInput
            name="name"
            placeholder="Enter name"
            textContentType="name"
            autoComplete="name"
            style={styles.onBoardingInput}
            returnKeyType="next"
            autoFocus
            placeholderTextColor={theme.colors.grey}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* email */}
          <FormikTextInput
            name="email"
            placeholder="Enter email address."
            textContentType="emailAddress"
            placeholderTextColor={theme.colors.grey}
            autoComplete="email"
            style={styles.onBoardingInput}
            returnKeyType="next"
            autoFocus
          />
        </View>
        <View style={styles.inputContainer}>
          {/* phone */}
          <FormikTextInput
            name="phone"
            placeholder="Enter phone number."
            textContentType="telephoneNumber"
            placeholderTextColor={theme.colors.grey}
            autoComplete="tel"
            style={styles.onBoardingInput}
            returnKeyType="next"
            autoFocus
          />
        </View>
        {/* password */}
        <View style={styles.inputContainer}>
          <FormikTextInput
            name="password"
            placeholder="Enter password."
            textContentType="password"
            placeholderTextColor={theme.colors.grey}
            autoComplete="password"
            style={styles.onBoardingInput}
            secureTextEntry={!showPassword}
            isPasswordField
            togglePassword={togglePassword}
            togglePasswordStyle={styles.iconPassword}
            returnKeyType="next"
            autoFocus
          />
        </View>

        {/* confirm password */}
        <View style={styles.inputContainer}>
          <FormikTextInput
            name="confirmPassword"
            placeholder="Confirm your password."
            textContentType="password"
            placeholderTextColor={theme.colors.grey}
            autoComplete="password"
            style={styles.onBoardingInput}
            secureTextEntry={!showConfirmPassword}
            isPasswordField
            togglePassword={toggleConfirmPassword}
            togglePasswordStyle={styles.iconPassword}
          />
          {showConfirmPassword ? (
            <EyeIconClosed
              style={styles.iconPassword}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              fill={theme.colors.black}
            />
          ) : (
            <EyeIcon
              style={styles.iconPassword}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              fill={theme.colors.black}
            />
          )}
        </View>

        {/* forgot password link */}
        <Text color="primary" textType="labelLink">
          Got an account? Sign In{' '}
        </Text>
      </View>
    </>
  );
};

export default SignupForm;
