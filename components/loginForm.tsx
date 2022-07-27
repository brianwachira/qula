import React from 'react';
import {Text, View} from 'react-native';
import Button from './shared-ui/button';
import FormikTextInput from './shared-ui/formikTextInput';

const LoginForm = ({onSubmit}: {onSubmit: any}) => {
  return (
    <>
      <View>
        {/* email */}
        <Text>Email Address</Text>
        <FormikTextInput
          name="email"
          textContentType="emailAddress"
          autoComplete="email"
        />

        {/* password */}
        <Text>Password</Text>
        <FormikTextInput
          name="password"
          textContentType="password"
          autoComplete="password"
        />
      </View>
      <Button
        onPress={onSubmit}
        title="Login"
        buttonType="orange"
        textType="labelButtonOrange"
        accessibilityLabel="Login"
      />
    </>
  );
};

export default LoginForm;
