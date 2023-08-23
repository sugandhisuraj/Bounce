import React, {useState,useCallback,useRef} from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import CountryPicker from 'react-native-country-codes-picker';

import {APP_CONFIGURATIONS} from '../../constants';
import {wp} from '../../utils';
import Styles from './indexCss';
import {FloatingInput, Buttons} from '@components';

const useCountryCodeAndOtpLayout = () => {
  const timerRef = useRef();
  const [otpInput, setOtpInput] = useState('');
  const [timer, setTimer] = useState(0);
  const [showCountryCodeModel, setShowCountryCodeModel] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState('+1');

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
  const CountryCodeModal = props => {
    const {countryCodeModalContainerStyle = {}} = props;
    if (!showCountryCodeModel) {
      return null;
    }
    return (
      <View
        style={[
          Styles.countryCodeModalContainer,
          countryCodeModalContainerStyle,
        ]}>
        <CountryPicker
          show={showCountryCodeModel}
          pickerButtonOnPress={item => {
            console.log('SELECTED_COUNTRY_CODE - ', item);
            setSelectedCountryCode(item.dial_code);
            if (props.onSelectCountryCode) {
              props.onSelectCountryCode(item);
            }
            setShowCountryCodeModel(false);
          }}
        />
      </View>
    );
  };
  const SelectedCountryCodeShowTray = props => {
    const {
      customSelectedCountryCodeText = null,
      countryCodeTextContainerStyle = {},
      countryCodeTextStyle = {},
    } = props;

    const selectedCountryCodeText =
      customSelectedCountryCodeText ?? selectedCountryCode;
    return (
      <TouchableOpacity
        style={[countryCodeTextContainerStyle]}
        onPress={() => {
          setShowCountryCodeModel(true);
        }}>
        <TextInput
          pointerEvents={'none'}
          editable={false}
          style={[Styles.showCountryCodeTextStyle, countryCodeTextStyle]}
          value={selectedCountryCodeText}
        />
      </TouchableOpacity>
    );
  };
  const OtpInputAndResendTray = props => {
    const {
      otpInputContainerStyle = {},
      phoneNumber = '',
      otpInputTextStyle = {},
      sendCodeContainerStyle = {},
      onSendOtp,
    } = props;
    if (!(APP_CONFIGURATIONS.IS_PRODUCTION && phoneNumber.length > 0)) {
      return null;
    }
    return (
      <View style={[Styles.OtpInputTray, otpInputContainerStyle]}>
        <TextInput
          maxLength={6}
          placeholder={'Enter 6-digit code'}
          keyboardType={'numeric'}
          style={[Styles.otpInputTextStyle, otpInputTextStyle]}
          onChangeText={setOtpInput}
          value={otpInput}
        />

        <Buttons.PrimaryButton
          containerStyle={[
            Styles.sendCodeContainerStyle,
            sendCodeContainerStyle,
          ]}
          onPress={timer != 0 ? null : () => onSendOtp(otpInput)}
          title={timer == 0 ? 'Send Code' : timer}
          withShadow={false}
        />
      </View>
    );
  };

  return {
    otpInput,
    setOtpInput,
    timer,
    setTimer,
    setShowCountryCodeModel,
    selectedCountryCode,
    setSelectedCountryCode,
    startTimer,
    CountryCodeModal,
    SelectedCountryCodeShowTray,
    OtpInputAndResendTray,
  };
};

export default useCountryCodeAndOtpLayout;
