import React, {memo} from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {FONTFAMILY, FONTSIZE, getWp, getHp} from '../../app/utils';

const VerticalIcon = props => {
  const {
    withShadow,
    isHighlighted,
    highlightedColor,
    onPress,
    Icon,
    containerStyle,
    title,
    titleStyle,
    styledComponent
  } = props;

  let RenderComponent = TouchableOpacity;
  if (styledComponent) {
    RenderComponent = styledComponent
  }
  return (
    <RenderComponent
      disabled={!onPress}
      onPress={onPress}
      style={[
        Styles.container,
        isHighlighted && Styles.hightedStyle,
        highlightedColor && {backgroundColor: highlightedColor},
        withShadow && Styles.shadowStyle,
        containerStyle,
      ]}>
      {Icon}
      <Text style={[Styles.title, titleStyle]}>{title}</Text>
    </RenderComponent>
  );
};

VerticalIcon.defaultProps = {
  Icon: null,
  containerStyle: {},
  title: 'Title',
  titleStyle: {},
  onPress: null,
  isHighlighted: false,
  highlightedColor: null,
  withShadow: false,
  styledComponent: null
};

const Styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 0,
  },
  container: {
    height: getHp(62),
    width: getWp(105),
    borderRadius: getHp(15),
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#F2F5F6',
    //elevation: 2,
  },
  title: {
    color: '#000',
    fontSize: FONTSIZE.Text12,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    marginTop: getHp(5),
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  hightedStyle: {
    backgroundColor: '#CCF9E999',
  },
});
export default memo(VerticalIcon, () => false);
