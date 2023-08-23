import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../app/utils';

const PrimaryButton = props => {
  const {onPress,title, withShadow,titleStyle, containerStyle, textColor} = props;

   return (
    <TouchableOpacity
    disabled={!onPress}
    onPress={onPress}
      style={[Styles.container, withShadow && Styles.boxShadow, containerStyle]}>
      <Text style={[Styles.title, textColor && {color: textColor}, titleStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
PrimaryButton.defaultProps = {
  title: 'Add Title',
  titleStyle: {},
  containerStyle: {},
  textColor: null,
  withShadow: true,
  onPress: null
};
const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHp(42),
    width: getWp(175),
    backgroundColor: 'white',
    borderRadius: getHp(15),
  },
  title: {
    fontWeight: '600',
    fontSize: FONTSIZE.Text18,
    fontFamily: FONTFAMILY.AvenirNextRegular,
    letterSpacing: 0.3,
    color: '#1FAEF7',
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
export default PrimaryButton;
