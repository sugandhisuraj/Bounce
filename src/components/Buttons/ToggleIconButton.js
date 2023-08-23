import React from 'react';
import {TouchableOpacity, Text, StyleSheet,View} from 'react-native';
import {FONTFAMILY, getHp, FONTSIZE, getWp} from '../../app/utils';

const ToggleIconButton = props => {
  const {onPress, title, Icon,RightIcon, containerStyle, iconContainerStyle,titleStyle} = props;
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[Styles.container, Styles.boxShadow, containerStyle]}>
      {Icon && <View style={[
          Styles.iconContainer,
          iconContainerStyle
      ]}>{Icon}</View>}
      <Text style={[Styles.title, titleStyle]}>{title}</Text>
      {RightIcon && RightIcon}
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: getHp(45),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#FFF',borderRadius: getHp(15)
  },
  title: {
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '600',
    fontSize: FONTSIZE.Text18,
  },
  boxShadow: {
    shadowColor: 'rgba(0, 0, 0, 0.05)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  iconContainer: {
      marginRight: getWp(15)
  }
});
ToggleIconButton.defaultProps = {
  onPress: null,
  title: '',
  Icon: null,
  containerStyle: {},
  titleStyle: {},
  svgContainerStyle:{}
};
export default ToggleIconButton;
