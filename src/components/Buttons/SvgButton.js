import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradientComponent from 'react-native-linear-gradient';
import {FONTSIZE, getHp, getWp} from '../../app/utils';
const SvgButton = props => {
  const {
    onPress,
    containerStyle = {},
    titleStyle = {},
    svgContainerStyle = {},
    title,
    Svg,
    SvgStyle,
    svgColors
  } = props;
  return (
    <LinearGradientComponent
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={svgColors}
      style={[styles.containerStyle, containerStyle]}>
      <TouchableOpacity style={[styles.containerStyle]} onPress={onPress}>
        <Svg {...SvgStyle} />
        <Text style={[styles.titleStyle, titleStyle]}>{title}</Text>
      </TouchableOpacity>
    </LinearGradientComponent>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    width: '100%',
    height: getHp(42),
    borderRadius: getHp(13),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  titleStyle: {
    fontWeight: '600',
    fontSize: FONTSIZE.Text16,
    fontFamily: 'AvenirNext-Regular',
    letterSpacing: 0.8,
    marginLeft: getHp(5),
  },
});

SvgButton.defaultProps = {
  svgColors: ['#B6F1FF', '#CEF6FF']
}
export default memo(SvgButton);
