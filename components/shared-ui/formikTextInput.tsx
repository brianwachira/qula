/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {StyleSheet, TextInputProps} from 'react-native';
import {useField} from 'formik';
import TextInput from './textInput';
import Text from './text';
import theme from '../../styles/themes';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.danger,
  },
});

interface formikTextInputProps extends TextInputProps {
  name: string;
}

const FormikTextInput = (props: formikTextInputProps) => {
  const {name}: {name: string} = props;
  const [field, meta, helpers] = useField(name);

  // Check if the field is touched and the error message is present
  const showError: boolean = (meta.touched && meta.error) as boolean;

  return (
    <>
      <TextInput
        onChangeText={(value: any) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {/* Show the error message if the value of showError variable is true */}
      {showError && (
        <Text style={styles.errorText} textType="labelSmall">
          {meta.error}
        </Text>
      )}
    </>
  );
};

export default FormikTextInput;
