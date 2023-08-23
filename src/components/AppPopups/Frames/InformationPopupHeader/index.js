import React, {Fragment} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';

import {CloseGreyCircularSvg} from '@svg';

import Styles from './indexCss';

const InformationPopupHeader = props => {
  const {title, onClosePress,descriptionTextStyle} = props;
  return (
    <Fragment>
      <View style={[Styles.topHeadingContainer]}>
        <Text style={[Styles.descriptionText,descriptionTextStyle]}>{title}</Text>
        <TouchableOpacity disabled={!onClosePress} onPress={onClosePress}>
          <CloseGreyCircularSvg />
        </TouchableOpacity>
      </View>
      <View style={[Styles.lineBreak]} />
    </Fragment>
  );
};

export default InformationPopupHeader;
