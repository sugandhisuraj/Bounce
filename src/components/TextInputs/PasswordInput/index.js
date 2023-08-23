import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {GreyEye, BlueEye} from '@svg';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';
const PasswordInput = props => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const {containerStyle, textInputStyle, value, placeholder, onChangeText} =
    props;
    const onPressEye = () => setSecureTextEntry(i => !i);
  const EyeComponent = !secureTextEntry
    ? PasswordInput.EnableEye({onPress: onPressEye})
    : PasswordInput.DisableEye({onPress: onPressEye});
  return (
    <View style={[Styles.container, containerStyle]}>
      <TextInput
        autoCapitalize={'none'}
        autoCorrect={false}
        placeholderTextColor={'#999'}
        style={[Styles.textInputStyle, textInputStyle]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
      />
      {EyeComponent}
    </View>
  );
};

PasswordInput.EnableEye = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <BlueEye height={getHp(20)} width={getWp(20)} />
    </TouchableOpacity>
  );
};
PasswordInput.DisableEye = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <GreyEye height={getHp(20)} width={getWp(20)} />
    </TouchableOpacity>
  );
};
const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: getHp(50),
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F2F5F6',
    borderRadius: getHp(15),
    paddingHorizontal: getWp(15),
  },
  textInputStyle: {
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: 'black', 
    width: '90%',
    height: '100%'
  },
});

export default PasswordInput;
