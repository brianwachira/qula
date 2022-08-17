import React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../styles/themes';
import Button from './shared-ui/button';
import FormikTextInput from './shared-ui/formikTextInput';
import Text from './shared-ui/text';

const styles = StyleSheet.create({
  input: {
    backgroundColor: theme.colors.white,
    color: '#202731',
    borderColor: '#818298',
    borderWidth: 1,
    height: 60,
    borderRadius: 30,
    padding: 10,
  },
});

const EditProfileForm = ({onSubmit}: {onSubmit: any}) => {
  return (
    <View
      style={{
        flex: 0.7,
        justifyContent: 'center',
      }}>
      <View
        style={{
          marginBottom: 20,
        }}>
        <Text textType="labelButtonWhite">Name</Text>
        <FormikTextInput
          name="name"
          testID="name"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
        }}>
        <Text textType="labelButtonWhite">Email Address</Text>
        <FormikTextInput
          name="email"
          testID="email"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
        />
      </View>
      <View
        style={{
          marginBottom: 10,
        }}>
        <Text textType="labelButtonWhite">Phone Number</Text>
        <FormikTextInput
          name="phone"
          testID="phone"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
        />
      </View>
      <View
        style={{
          marginBottom: 20,
        }}
      />
      <Button
        onPress={onSubmit}
        title="Update Details"
        accessibilityLabel="Manage your account"
        testID="Update Details"
        buttonType="orange"
      />
    </View>
  );
};

export default EditProfileForm;
