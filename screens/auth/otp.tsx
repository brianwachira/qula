import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../types';
import OTPInput from '../../components/shared-ui/otpInput';
import theme from '../../styles/themes';
import Button from '../../components/shared-ui/button';
import {useStorage} from '../../hooks/useStorage';
import Text from '../../components/shared-ui/text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: theme.colors.white,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    marginTop: 2,
  },
  buttonText: {
    color: '#000000',
    fontSize: 20,
  },
  textStyle: {
    marginBottom: 10,
  },
});

const Otp = ({
  route,
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Otp'>) => {
  const [otp, setOTP] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumLength = 5;

  const [user, setUser] = useStorage('email');

  const handleSubmit = (): void => {
    const userToSave = {
      email: route.params.email,
    };

    setUser(userToSave);

    console.log(user);
    navigation.navigate('Home');
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={{flex: 0.2}}>
        <Text style={styles.textStyle}>Enter OTP</Text>
        <OTPInput
          code={otp}
          setCode={setOTP}
          maximumLength={maximumLength}
          setIsPinReady={setIsPinReady}
        />
      </View>
      <Button
        buttonType="orange"
        disabled={!isPinReady}
        title="Proceed"
        onPress={() => handleSubmit()}
      />
    </Pressable>
  );
};

export default Otp;
