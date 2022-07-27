/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Text as NativeText,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import theme from '../../styles/themes';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.black,
    fontSize: theme.fontSizes.label.normal.fontSize,
    lineHeight: theme.fontSizes.label.normal.lineHeight,
    letterSpacing: theme.fontSizes.label.normal.letterSpacing,
  },
  fontLabelSideBar: {
    ...theme.fontSizes.label.sideBar,
  },
  fontLabelButtonOrange: {
    color: theme.colors.white,
    ...theme.fontSizes.label.button,
  },
  fontLabelButtonWhite: {
    color: theme.colors.primary,
    ...theme.fontSizes.label.button,
  },
  fontLabelSmall: {
    ...theme.fontSizes.label.small,
  },
  fontOnboardingHeading: {
    ...theme.fontSizes.onboarding.heading,
  },
  fontOnboardingSubheading: {
    ...theme.fontSizes.onboarding.subheading,
  },
  fontOnboardingSubheading2: {
    ...theme.fontSizes.onboarding.subheading2,
  },
  fontAppBarTitle: {
    ...theme.fontSizes.appBarTitle,
  },
  fontSubHeading: {
    ...theme.fontSizes.subheading,
  },
  fontEmpty: {
    ...theme.fontSizes.empty,
  },
  fontCalendarNumber: {
    ...theme.fontSizes.calendar.number,
  },
  textAlignCenter: {
    ...theme.textAlignCenter,
  },
});

export type textProps = {
  color?: 'primary' | 'secondary';
  font?:
    | 'newYorkMediumBold'
    | 'newYorkMediumBlack'
    | 'newYorkMedium'
    | 'newYorkMediumRegular'
    | 'sfProDisplayBold'
    | 'sfProDisplayMedium'
    | 'sfProDisplayRegular';
  style?: StyleProp<TextStyle>;
  textType?:
    | 'labelSideBar'
    | 'labelButtonOrange'
    | 'labelButtonWhite'
    | 'labelSmall'
    | 'onboardingHeading'
    | 'onboardingSubheading'
    | 'onboardingSubheading2'
    | 'appBarTitle'
    | 'subheading'
    | 'empty'
    | 'calendarNumber';
  textAlign?: 'center';
};
const Text = ({
  style,
  textType,
  textAlign,
  ...props
}: textProps & NativeText['props']) => {
  const textStyle = [
    styles.text,
    textType === 'labelSideBar' && styles.fontLabelSideBar,
    textType === 'labelButtonOrange' && styles.fontLabelButtonOrange,
    textType === 'labelButtonWhite' && styles.fontLabelButtonWhite,
    textType === 'labelSmall' && styles.fontLabelSmall,
    textType === 'onboardingHeading' && styles.fontOnboardingHeading,
    textType === 'onboardingSubheading' && styles.fontOnboardingSubheading,
    textType === 'onboardingSubheading2' && styles.fontOnboardingSubheading2,
    textType === 'appBarTitle' && styles.fontAppBarTitle,
    textType === 'subheading' && styles.fontSubHeading,
    textType === 'empty' && styles.fontEmpty,
    textType === 'calendarNumber' && styles.fontCalendarNumber,
    textAlign === 'center' && styles.textAlignCenter,
    style,
  ];
  return <NativeText style={textStyle} {...props} />;
};
export default Text;
