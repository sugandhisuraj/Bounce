import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import styled from 'styled-components/native';

import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

const RoundToggle = props => {
  const {
    onPress,
    title,
    baseContainerStyle,
    containerStyle,
    titleStyle,
    StyledComponent,
  } = props;

  let Wrapper = Styled.TouchContainer;
  if (StyledComponent) {
    Wrapper = StyledComponent;
  }
  return (
    <View style={[{alignItems: 'baseline'}, baseContainerStyle]}>
      <Wrapper
        style={[Styles.container, containerStyle]}
        disabled={!onPress}
        onPress={onPress}>
        <Text style={[Styles.titleStyle, titleStyle]}>{title}</Text>
      </Wrapper>
    </View>
  );
};

RoundToggle.defaultProps = {
  containerStyle: {},
  title: 'Add Title',
  titleStyle: {},
  StyledComponent: null,
  baseContainerStyle: {}
};
const Styled = {
  TouchContainer: styled.TouchableOpacity`
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 13px;
  `,
};
const Styles = StyleSheet.create({
  container: {
    borderRadius: getHp(15),
    height: getHp(30),
    paddingHorizontal: getWp(13),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '500',
    fontSize: FONTSIZE.Text16,
    letterSpacing: 0.3,
    color: '#000',
  },
});
export default RoundToggle;
