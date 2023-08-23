import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import Styles from './indexCss';

const GenderRadio = props => {
  const {containerStyle, genderType, titleStyle, isSelected, onPress} = props;

  const UnSelectedRadio = () => {
    return <View style={[Styles.radioContainer]} />;
  };
  const SelectedRadio = () => {
    return (
      <View style={[Styles.radioContainer, Styles.radioSelectedContainer]}>
        <View style={[Styles.radioSelectedChildView]} />
      </View>
    );
  };
  return (
    <TouchableOpacity 
    activeOpacity={.7}
    disabled={!onPress}
    onPress={() => onPress(genderType)}
    style={[Styles.genderRadioContainer, containerStyle]}>
      {isSelected ? <SelectedRadio /> : <UnSelectedRadio />}
      <Text style={[Styles.title, titleStyle]}>{genderType.title}</Text>
    </TouchableOpacity>
  );
};

GenderRadio.defaultProps = {
  containerStyle: {},
  genderType: {},
  titleStyle: {},
  isSelected: false,
};
export default GenderRadio;
