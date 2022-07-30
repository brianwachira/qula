import React from 'react';
import {Dimensions} from 'react-native';
import {
  Platform,
  ButtonProps,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import theme from '../../styles/themes';
import Text, {textProps} from './text';

const styles = StyleSheet.create({
  button: {
    width: Dimensions.get('screen').width - 100,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: theme.borderRadius.button,
    ...theme.boxShadowAndroid,
  },
  buttonStyleOrange: {
    width: Dimensions.get('screen').width - 100,
    paddingVertical: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.button,
    ...theme.boxShadowAndroid,
  },
  buttonStyleCancel: {
    width: Dimensions.get('screen').width - 100,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderRadius: theme.borderRadius.button,
    ...theme.boxShadowAndroid,
  },
});

// type for custom button
interface buttonProps extends ButtonProps {
  style?: StyleProp<ViewStyle>;
  textFont?: textProps['font'];
  textType?: textProps['textType'];
  textAlign?: textProps['textAlign'];
  textColor?: textProps['color'];
  buttonType?: 'confirm' | 'orange' | 'cancel';
}

const Button = ({
  style,
  textFont,
  textType,
  textAlign,
  title,
  onPress,
  textColor,
  buttonType,
  ...props
}: buttonProps) => {
  const ButtonStyle: StyleProp<ViewStyle> = [
    styles.button,
    Platform.OS === 'android' ? theme.boxShadowAndroid : theme.boxShadowIOS,
    buttonType === 'orange' && styles.buttonStyleOrange,
    buttonType === 'cancel' && styles.buttonStyleCancel,
    style,
  ];
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <View style={ButtonStyle}>
        <Text
          font={textFont || 'sfProDisplayMedium'}
          textType={textType || 'labelButtonOrange'}
          textAlign={textAlign || 'center'}
          color={textColor}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Button;
