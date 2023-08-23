import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import LinearGradientComponent from 'react-native-linear-gradient';
import Right from 'react-native-vector-icons/FontAwesome';
import {getHp, getWp, FONTSIZE} from '../../app/utils';
const LinearGradient = props => {
  const {
    title = '',
    onPress,
    linearGradientStyle,
    gradientColors,
    gradientStart,
    gradientEnd,
    showArrow,
    titleStyle,
    touchContainerStyle
  } = props;
  return (
    <LinearGradientComponent
      start={gradientStart}
      end={gradientEnd}
      colors={gradientColors}
      style={[styles.linearGradient, linearGradientStyle]}>
      <TouchableOpacity style={[styles.touchBtnStyle, touchContainerStyle]} 
      disabled={!onPress}
      onPress={onPress}>
        <Text style={[styles.buttonText,titleStyle]}>{title}</Text>
        {showArrow && <Right name="angle-right" color="#FFFFFF" size={25} />}
      </TouchableOpacity>
    </LinearGradientComponent>
  );
};
LinearGradient.defaultProps = {
  linearGradientStyle: {},
  gradientColors: ['#16B0FE', '#3FBEFF'],
  gradientStart: {x: 0, y: 0},
  gradientEnd: {x: 1, y: 1},
  showArrow: true,
  titleStyle: {},
  touchContainerStyle: {}
};
const styles = StyleSheet.create({
  linearGradient: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(56),
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: getWp(15),
    width: '100%',
    height: getHp(38),
    marginTop: getHp(10),
  },
  touchBtnStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Medium',
    color: '#fff',
    paddingHorizontal: getWp(10),
  },
});

export default LinearGradient;
