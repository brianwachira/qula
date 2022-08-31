import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Keyboard, Pressable, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../types/types';
import OTPInput from '../../components/shared-ui/otpInput';
import theme from '../../styles/themes';
import Button from '../../components/shared-ui/button';
import {useStorage} from '../../hooks/useStorage';
import Text from '../../components/shared-ui/text';
import axios from 'axios';
import {API_URL} from '@env';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    flex: 0.1,
  },
  inputContainer: {
    flex: 0.15,
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
    color: theme.colors.black,
    fontSize: 20,
  },
  textStyle: {
    marginBottom: 10,
    textAlign: 'left',
  },
});

const Otp = ({
  route,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  navigation,
}: NativeStackScreenProps<RootStackParamList, 'Otp'>) => {
  const [otp, setOTP] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumLength = 4;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [user, setUser] = useStorage('user');

  const handleSubmit = (): void => {
    const params = new URLSearchParams({
      totp: route.params.otp,
      phone: route.params.phone,
    }).toString();

    axios.post(`${API_URL}/verify-otp?${params}`).then(response => {
      if (response.data.status === false) {
        // theres a problem
        console.log(response.data.status_messsage);
      } else {
        // create user object
        const newUser = {
          authKey: route.params.authKey,
          phone: route.params.phone,
          userId: route.params.userId,
          clientId: route.params.clientId,
        };
        // save the new user
        setUser(newUser);
      }
    });
  };

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <View style={styles.labelContainer}>
        <Text style={styles.textStyle}>Enter OTP</Text>
      </View>
      <View style={styles.inputContainer}>
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
