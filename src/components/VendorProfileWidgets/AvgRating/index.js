import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {StarWhite} from '@svg';
import {FONTFAMILY, FONTSIZE, getHp, getWp} from '../../../app/utils';

const AvgRating = props => {
  const {containerStyle,ratingText} = props;
  return (
    <View style={[Styles.container, containerStyle]}>
      <View style={[Styles.starYellowContainer]}>
        <StarWhite height={getHp(18)} width={getHp(18)} />
      </View>
      <Text style={[Styles.ratingText]}>{ratingText}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    height: getHp(32),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: getHp(8),
    borderRadius: getHp(9),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  starYellowContainer: {
    height: getHp(22),
    width: getHp(22),
    borderRadius: getHp(5),
    backgroundColor: '#F8A41E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: getWp(7),
    fontSize: FONTSIZE.Text16,
    color: '#000',
    fontFamily: FONTFAMILY.AvenirNextRegular,
    fontWeight: '400',
    top: getHp(1),
  },
});

AvgRating.defaultProps = {
  containerStyle: {},
};
export default AvgRating;
