/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  TextInput as NativeTextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextInputProps,
} from 'react-native';
import theme from '../../styles/themes';

const styles = StyleSheet.create({
  borderDanger: {
    borderBottomColor: theme.colors.danger,
    borderBottomWidth: 1,
  },
});
interface textInputProps extends TextInputProps {
  error?: boolean;
}

const TextInput = ({style, error, ...props}: textInputProps) => {
  const textInputStyle: StyleProp<TextStyle> = [
    style,
    error && styles.borderDanger,
  ];
  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
