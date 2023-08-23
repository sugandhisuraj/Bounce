import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';
const PrimartyInput = props => {
  const {
    containerStyle,
    textInputStyle,
    value,
    placeholder,
    onChangeText,
    textInputProps,
  } = props;
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
        autoCorrect={false}
        
        {...textInputProps}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: getHp(50),
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#F2F5F6',
    borderRadius: getHp(15),
    paddingHorizontal: getWp(15),
  },
  textInputStyle: {
    fontSize: FONTSIZE.Text16,
    fontWeight: '500',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    color: 'black',
    height: '100%',
  },
});
PrimartyInput.defaultProps = {
  containerStyle: {},
  textInputStyle: {},
  value: '',
  placeholder: '',
  onChangeText: () => null,
  textInputProps: {},
};
export default PrimartyInput;
