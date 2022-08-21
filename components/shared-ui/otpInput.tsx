import React, {useRef, useState, useEffect} from 'react';
import {Pressable, StyleSheet, TextInput, View} from 'react-native';
import theme from '../../styles/themes';
import Text from './text';

const styles = StyleSheet.create({
  otpInputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputHidden: {
    position: 'absolute',
    opacity: 0,
  },
  splitOtpBoxesContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  splitBoxes: {
    borderColor: '#E5E5E5',
    borderWidth: 2,
    borderRadius: 10,
    padding: 12,
    minWidth: 50,
    marginHorizontal: 5,
  },
  splitBoxText: {
    fontSize: 20,
    textAlign: 'center',
    color: theme.colors.primary,
  },
  splitBoxesFocused: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.tab,
  },
});

type OTPInputProps = {
  code: string;
  setCode: (code: string) => void;
  maximumLength: number;
  setIsPinReady: (isPinReady: boolean) => void;
};

const OTPInput = (props: OTPInputProps) => {
  const {code, setCode, maximumLength, setIsPinReady} = props;

  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef<TextInput>(null);

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current?.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const boxDigit = (_: any, index: number) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputBoxFocused && isValueFocused
        ? {...styles.splitBoxes, ...styles.splitBoxesFocused}
        : styles.splitBoxes;

    return (
      <View key={index} style={StyledSplitBoxes}>
        <Text style={styles.splitBoxText}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.otpInputContainer}>
      <Pressable style={styles.splitOtpBoxesContainer} onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={styles.textInputHidden}
        onChangeText={setCode}
        value={code}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default OTPInput;
