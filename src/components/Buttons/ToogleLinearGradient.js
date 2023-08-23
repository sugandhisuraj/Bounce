import React from 'react';
import {Button, Text} from 'native-base';
import {getWp, getHP} from '@utils';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FONTFAMILY, FONTSIZE, getHp} from '../../app/utils';
import LinearGradient from 'react-native-linear-gradient';
const ToogleLinearGradient = props => {
  let {
    onPress = () => {},
    title = 'Title',
    checked = false,
    containerStyle = {},
    checkedColors = null,
    uncheckedColors = null,
  } = props;
  if (!checkedColors) {
    checkedColors = ['#5EC7FC', '#91DAFF'];
  }
  if (!uncheckedColors) {
    uncheckedColors = ['#F2F5F6', '#F2F5F6'];
  }
  const ButtonComponent = () => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[Styles.container, containerStyle]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[Styles.container, containerStyle]}
          colors={checked ? checkedColors : uncheckedColors}>
          <Text style={[Styles.textStyle, checked && Styles.checkTextStyle]}>
            {title}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return <ButtonComponent />;
};

const Styles = StyleSheet.create({
  container: {
    height: getHp(28),
    borderRadius: getHp(100),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    paddingHorizontal: getWp(15),
    color: '#999999',
    fontSize: FONTSIZE.Text14,
    fontWeight: '400',
    fontFamily: FONTFAMILY.AvenirNextMedium,
  },
  checkTextStyle: {
    color: '#FFF',
    fontWeight: '600',
  },
});
export default ToogleLinearGradient;
