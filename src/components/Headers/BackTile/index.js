import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {getHp} from '../../../app/utils';

import Styles from './indexCss';

AntDesign.loadFont();
const BackTitle = props => {
  const {containerStyle,titleTextStyle, title, onBackPress, onTitlePress, backStyleContainer} =
    props;
  return (
    <View style={[Styles.container, containerStyle]}>
      <TouchableOpacity
        style={[Styles.backStyleContainer, backStyleContainer]}
        disabled={!onBackPress}
        onPress={onBackPress}>
        <AntDesign name="left" color={'#000'} size={getHp(25)} />
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!onTitlePress}
        onPress={onTitlePress}
        style={[Styles.titleContainer]}>
        <Text style={[Styles.titleText, titleTextStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

BackTitle.defaultProps = {
  containerStyle: {},
  onBackPress: null,
  backStyleContainer: {},
  title: 'Title',
  onTitlePress: null,
  titleTextStyle: {}
};
export default BackTitle;
