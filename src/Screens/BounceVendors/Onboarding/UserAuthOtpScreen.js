import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Root, Buttons, ProgressCircle} from '@components';
import {
  FONTSIZE,
  getHp,
  getWp,
  validateEmail,
  validatePass,
  smallHitSlop,
} from '@utils';
import {postData} from '../../../FetchServices';
import {useSelector, useDispatch} from 'react-redux';
import {fetchVendorData} from '../../../reducer/mainexpensecategory';
import BirthDayScreen from './BirthDayScreen';
import EmailScreen from './EmailScreen.js';
import {ApiClient, AuthService} from '../../../app/services';
import {Scaffold} from '@components';
import {Toast} from '@constants';
import {useKeyboardStatus} from '@hooks';
import {BlueEye, GreyEye} from '@svg';
import CountryPicker from 'react-native-country-codes-picker';
import UserNameScreen from './UsernameScreen';
import MobxStore from '../../../mobx';
import {OTPInputs} from '../../../components';
import ProfilePic from './ProfilePic';
export default function UserAuthOtpScreen(props) {
  const timerRef = useRef(null);
  const {navigation} = props;
  const {phoneNumber, countryCode, username, password, fullName} =
    props.route.params;
  const [isKeyboardOpen] = useKeyboardStatus();
  const [correctOtp, setCorrectOtp] = useState(null);
  const [otpInput, setOtpInput] = useState('');
  const [timer, setTimer] = useState(30);
  useEffect(() => {
    sendOtp();
  }, [phoneNumber, countryCode]);
  console.log('CORRECT_OTP - ', otpInput);

  const startTimer = useCallback(() => {
    setTimer(_ => 30);
    timerRef.current = setInterval(() => {
      setTimer(t => {
        if (t == 0) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  }, []);
  const sendOtp = useCallback(async () => {
    try {
      MobxStore.toggleLoader(true);
      let selectedCountryCode = countryCode?.dial_code ?? '+1';
      let mobileNo = selectedCountryCode.concat(phoneNumber);
      const otp = await AuthService.sendAuthOtp(mobileNo);
      setCorrectOtp(_ => otp.otp);
      startTimer();
    } catch (error) {
      console.log(error);
      Toast(
        error?.response?.data?.message ?? 'Something went wrong! Try Again',
      );
    } finally {
      MobxStore.toggleLoader(false);
    }
  }, [MobxStore, correctOtp]);
  const handleSubmit = useCallback(() => {
    if (otpInput.length == 0) {
      return Toast('Enter Otp');
    }
    if (isNaN(otpInput) || otpInput != correctOtp) {
      return Toast('Invalid Otp!');
    }

    navigation.replace(ProfilePic.routeName, {
      phoneNumber,
      countryCode,
      username,
      password,
      fullName,
    });
  }, [otpInput, correctOtp]);

  return (
    <Scaffold>
      <KeyboardAwareScrollView
        bounces={false}
        alwaysBounceVertical={false}
        scrollEnabled={true}
        style={{flex: 1, backgroundColor: '#FBFBFB'}}
        contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <Text style={styles.HeadingStyle}>{'6 Digit Confirmation'}</Text>

          <View style={{marginTop: 100, alignSelf: 'center'}}>
            <OTPInputs.Primary
              value={otpInput}
              onChangeText={t => {
                if (t.length == 6) {
                  Keyboard.dismiss();
                }
                setOtpInput(t);
              }}
            />
            <Text style={styles.infoText}>
              {'We texted you a 6 digit code'}
            </Text>
          </View>

          {!isKeyboardOpen && (
            <View
              style={{
                position: 'absolute',
                bottom: getHp(15),
                width: '100%',
                alignSelf: 'center',
              }}>
              <ProgressCircle
                currentProgress={3}
                containerStyle={{marginBottom: 20}}
              />
              <View
                style={{justifyContent: 'space-between', flexDirection: 'row'}}>
                <Buttons.PrimaryButton
                  containerStyle={{width: '47%'}}
                  onPress={timer != 0 ? null : () => sendOtp()}
                  title={timer == 0 ? 'Resend Code' : timer}
                  withShadow={true}
                />
                <Buttons.PrimaryButton
                  title={'Continue'}
                  textColor={'#FFF'}
                  containerStyle={{width: '47%', backgroundColor: '#1FAEF7'}}
                  withShadow={false}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </Scaffold>
  );
}
UserAuthOtpScreen.routeName = '/UserAuthOtpScreen';

const styles = StyleSheet.create({
  infoText: {
    fontSize: FONTSIZE.Text16,
    color: '#999999',
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.1,
    marginTop: getHp(20),
    alignSelf: 'center',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 15,
    flexDirection: 'column',
  },
  HeadingStyle: {
    marginTop: 40,
    fontFamily: 'AvenirNext-Medium',
    letterSpacing: 0.2,
    color: '#1FAEF7',
    fontSize: FONTSIZE.Text26,
  },
  textInput: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-Medium',
    marginTop: 10,
    color: '#000',
    maxWidth: '75%',
    minWidth: '75%',
  },
  showCountryCodeTextStyle: {
    fontSize: FONTSIZE.Text22,
    fontFamily: 'AvenirNext-Medium',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 2,
    color: '#000',
    marginTop: 10,
    borderWidth: 0,
    borderColor: 'red',
    width: getWp(80),
  },
});
