import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import EyeIcon from '../assets/icons/eyeIcon';
import EyeIconClosed from '../assets/icons/eyeIconClosed';
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
    height:
      Dimensions.get('window').height - Dimensions.get('window').height / 2,
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

const SignupForm = ({onSubmit}: {onSubmit: any}) => {
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
          <Text textType="labelInput">Email Address</Text>
          <FormikTextInput
            name="email"
            textContentType="emailAddress"
            autoComplete="email"
            style={styles.onBoardingInput}
            returnKeyType="next"
            autoFocus
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
          <Text textType="labelInput">Confirm Password</Text>
          <FormikTextInput
            name="confirmPassword"
            textContentType="password"
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
      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title="Sign Up"
          buttonType="orange"
          textType="labelButtonOrange"
          accessibilityLabel="Sign Up"
        />
      </View>
    </>
  );
};

export default SignupForm;
