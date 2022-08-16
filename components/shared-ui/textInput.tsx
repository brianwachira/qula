import React, {forwardRef, LegacyRef} from 'react';
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
    height: 40,
  },
});
interface textInputProps extends TextInputProps {
  error?: boolean;
}

const TextInput = forwardRef((props: textInputProps, ref) => {
  const textInputStyle: StyleProp<TextStyle> = [
    props.style,
    props.error && styles.borderDanger,
  ];
  return (
    <NativeTextInput
      style={textInputStyle}
      {...props}
      ref={ref as LegacyRef<NativeTextInput> | undefined}
    />
  );
});

export default TextInput;
