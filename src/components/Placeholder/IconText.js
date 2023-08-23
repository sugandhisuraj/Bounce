import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

import {Styles, Styled} from './indexCss';

const IconText = props => {
  const {
    icon,
    onPress = null,
    text,
    containerStyle = {},
    textStyle = {},
    textRenderLength = 45,
  } = props;

  let textRender = text ?? '';
  if (textRenderLength && textRender?.length > textRenderLength) {
    textRender = text.substr(0, textRenderLength) + '...';
  }
  return (
    <Styled.WrapperTouchable
      disabled={!onPress}
      onPress={onPress}
      style={[Styles.container, containerStyle]}>
      {icon}
      <Text style={[Styles.text, textStyle]}>{textRender}</Text>
    </Styled.WrapperTouchable>
  );
};

export default IconText;
