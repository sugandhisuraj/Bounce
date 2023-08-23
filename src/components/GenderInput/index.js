import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import GenderRadio from './GenderRadio';

import Styles from './indexCss';
const GenderInput = props => {
  const {containerStyle, value, onPress} = props;
  return (
    <View style={[Styles.container, containerStyle]}>
      {GenderInput.GenderTypes.map(gender => {
        return (
          <GenderRadio
            genderType={gender}
            onPress={onPress}
            isSelected={value == gender.value}
          />
        );
      })}
    </View>
  );
};
GenderInput.GenderTypes = [
  {
    title: 'Male',
    value: 0,
  },
  {
    title: 'Female',
    value: 1,
  },
  {
    title: 'Other',
    value: 2,
  },
];
GenderInput.defaultProps = {
  containerStyle: {},
  onPress: () => {},
  value: null,
};
export default GenderInput;
