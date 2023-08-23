import React from 'react';
import {View} from 'react-native';
import OtpInput from 'react-native-otp-textinput';
import {getWp} from '../../../app/utils';

import Styles from './indexCss';
const Primary = props => {
  const {value, inputCount, onChangeText, otpInputProps, containerStyle} =
    props;
  return (
    <View style={[Styles.container, containerStyle]}>
      <OtpInput
        handleTextChange={onChangeText}
        inputCount={inputCount}
        tintColor={'#DDDDDD'}
        offTintColor={'#DDDDDD'}
        textInputStyle={[Styles.textInputStyle]}
        containerStyle={[Styles.otpContainerStyle]}
      />
    </View>
  );
};

Primary.defaultProps = {
  value: '',
  onChangeText: () => console.log('Add onChangeText'),
  otpInputProps: {},
  containerStyle: {},
  inputCount: 6,
};
export default Primary;
