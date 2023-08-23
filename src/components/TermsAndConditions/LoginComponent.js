import React from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import { APP_CONFIGURATIONS } from '../../app/constants';
import {FONTFAMILY, FONTSIZE, getHp} from '../../app/utils';

const LoginComponent = () => {

    const onHandleURLS = url => {
        Linking.openURL(url);
    }
  return (
    <View style={Styles.container}>
      <Text style={[Styles.termsAndConditionStyle]}>
        {'By logging in or signing up, you agree to our  '}
        <TouchableOpacity
        onPress={() => onHandleURLS(APP_CONFIGURATIONS.TERMS_CONDITIONS_USE)}>
          <Text style={[Styles.termsAndConditionStyle, Styles.highlightedText]}>
            Terms of Use
          </Text>
        </TouchableOpacity>
      </Text>

      <Text style={[Styles.termsAndConditionStyle, {marginTop: getHp(5)}]}>
        {`and have read and understood our  `}
        <TouchableOpacity
        onPress={() => onHandleURLS(APP_CONFIGURATIONS.PRIVACY_POLICY_LINK)}>
          <Text style={[Styles.termsAndConditionStyle, Styles.highlightedText]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsAndConditionStyle: {
    fontWeight: '500',
    fontSize: FONTSIZE.Text12,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: '#999',
  },
  highlightedText: {
    fontWeight: '700',
    top: getHp(3.5),
  },
});
export default LoginComponent;
