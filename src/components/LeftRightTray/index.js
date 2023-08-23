import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {LeftBlueArrow, RightBlueArrow} from '@svg';

import Styles from './indexCss';

const LeftRightTray = props => {
  const {containerStyle, onRightPress, onLeftPress, total, current} = props;
  return (
    <View style={[Styles.container,Styles.shadowStyle, containerStyle]}>
      <TouchableOpacity disabled={!onLeftPress} onPress={onLeftPress}>
        <LeftBlueArrow />
      </TouchableOpacity>
      <View style={{flexDirection: 'row'}}>
        <Text style={[Styles.textStyle]}>{`${current}`}</Text>
        <Text
          style={[Styles.textStyle, {fontWeight: '400'}]}>{` / ${total}`}</Text>
      </View>
      <TouchableOpacity disabled={!onRightPress} onPress={onRightPress}>
        <RightBlueArrow />
      </TouchableOpacity>
    </View>
  );
};
LeftRightTray.defaultProps = {
  containerStyle: {},
  total: 20,
  current: 10,
  onLeftPress: null,
  onRightPress: null,
};
export default LeftRightTray;
