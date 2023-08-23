import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

const PrimaryGreyBgtBlackTitle = props => {
  const {onPress, title, titleStyle, containerStyle, textColor} = props;

  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={onPress}
      style={[Styles.container, containerStyle]}>
      <Text style={[Styles.title, textColor && {color: textColor}, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
PrimaryGreyBgtBlackTitle.defaultProps = {
  title: 'Add Title',
  titleStyle: {},
  containerStyle: {},
  textColor: null, 
  onPress: null,
};
const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(40),
    width: '100%',
    backgroundColor: '#FBFBFB',
    borderRadius: getHp(8),
    borderWidth:1,
    borderColor: '#E4EEF1'
  },
  title: {
    fontWeight: '600',
    fontSize: FONTSIZE.Text14,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.8,
    color: '#000',
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
export default PrimaryGreyBgtBlackTitle;
