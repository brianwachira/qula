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
    height: 58,
    borderRadius: 30,
    padding: 10,
    paddingLeft: 20,
  },
  inputSeparator: {
    marginBottom: 20,
  },
  editProfileForm: {
    flex: 1,
    justifyContent: 'center',
  },
  inputLabel: {marginLeft: 20, marginBottom: 10},
  buttonContainer: {alignItems: 'center'},
});

const EditProfileForm = ({onSubmit}: {onSubmit: any}) => {
  return (
    <View style={styles.editProfileForm}>
      <View style={styles.inputSeparator}>
        <Text style={styles.inputLabel} textType="labelButtonWhite">
          Name
        </Text>
        <FormikTextInput
          name="name"
          testID="name"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
          selectionColor={theme.colors.black}
        />
      </View>
      <View style={styles.inputSeparator}>
        <Text style={styles.inputLabel} textType="labelButtonWhite">
          Email Address
        </Text>
        <FormikTextInput
          name="email"
          testID="email"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
          selectionColor={theme.colors.black}
        />
      </View>
      <View style={styles.inputSeparator}>
        <Text style={styles.inputLabel} textType="labelButtonWhite">
          Phone Number
        </Text>
        <FormikTextInput
          name="phone"
          testID="phone"
          style={styles.input}
          placeholderTextColor={theme.colors.primary}
          selectionColor={theme.colors.black}
        />
      </View>
      <View style={styles.inputSeparator} />
      <View style={styles.buttonContainer}>
        <Button
          onPress={onSubmit}
          title="Update Details"
          accessibilityLabel="Manage your account"
          testID="Update Details"
          buttonType="orange"
        />
      </View>
    </View>
  );
};

export default EditProfileForm;
