import React from 'react';
import {Text, View} from 'react-native';

import Styles from './indexCss';
const RoundedView = props => {
  const {containerStyle, children, withShadow} = props;
  return <View style={[Styles.container, 
    withShadow && Styles.shadowStyles,
    containerStyle]}>{children}</View>;
};

RoundedView.defaultProps = {
  containerStyle: {},
  children: null,
  withShadow: false
};
export default RoundedView;
