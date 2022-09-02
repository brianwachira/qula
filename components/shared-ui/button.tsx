import React from 'react';
import {ActivityIndicator, Dimensions} from 'react-native';
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
  buttonStyleLoading: {
    paddingVertical: 13,
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
  loading?: boolean;
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
  loading,
  ...props
}: buttonProps) => {
  const ButtonStyle: StyleProp<ViewStyle> = [
    styles.button,
    Platform.OS === 'android' ? theme.boxShadowAndroid : theme.boxShadowIOS,
    buttonType === 'orange' && styles.buttonStyleOrange,
    buttonType === 'cancel' && styles.buttonStyleCancel,
    loading === true && styles.buttonStyleLoading,
    style,
  ];
  return (
    <TouchableOpacity
      onPress={onPress}
      {...props}
      activeOpacity={0.9}
      disabled={loading}>
      <View style={ButtonStyle}>
        {!loading ? (
          <>
            <Text
              font={textFont || 'sfProDisplayMedium'}
              textType={textType || 'labelButtonOrange'}
              textAlign={textAlign || 'center'}
              color={textColor}>
              {title}
            </Text>
          </>
        ) : (
          <>
            <ActivityIndicator
              color={
                buttonType === 'orange'
                  ? theme.colors.white
                  : theme.colors.primary
              }
              animating
              size="large"
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Button;
