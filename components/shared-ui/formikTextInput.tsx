import React from 'react';
import {StyleProp, StyleSheet, TextInputProps, ViewStyle} from 'react-native';
import {useField} from 'formik';
import TextInput from './textInput';
import Text from './text';
import theme from '../../styles/themes';
import EyeIcon from '../../assets/icons/eyeIcon';
import EyeIconClosed from '../../assets/icons/eyeIconClosed';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.danger,
  },
});

interface formikTextInputProps extends TextInputProps {
  name: string;
  isPasswordField?: boolean;
  togglePassword?: () => void;
  togglePasswordStyle?: StyleProp<ViewStyle>;
}

const FormikTextInput = (props: formikTextInputProps) => {
  const {
    name,
    isPasswordField,
    togglePassword,
    togglePasswordStyle,
  }: {
    name: string;
    isPasswordField?: boolean | undefined;
    showPassword?: boolean;
    togglePassword?: (() => void) | undefined;
    togglePasswordStyle?: StyleProp<ViewStyle>;
  } = props;
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
      {/* show toggle password field incase it's a password field */}
      {isPasswordField && (
        <>
          {!props?.secureTextEntry ? (
            <EyeIconClosed
              onPress={togglePassword}
              style={togglePasswordStyle}
              fill={theme.colors.black}
            />
          ) : (
            <EyeIcon
              onPress={togglePassword}
              style={togglePasswordStyle}
              fill={theme.colors.black}
            />
          )}
        </>
      )}
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
