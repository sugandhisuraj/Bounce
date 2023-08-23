import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';

import {YellowStar, StarWhite} from '@svg';
import Styles from './indexCss';
import {getHp} from '../../app/utils';

const RatingComponent = props => {
  const {
    starSize,
    onRating,
    containerStyle,
    starContainerStyle,
    maxStar,
    activeStar,
  } = props;
  const SingleStar = (s, i) => {
    let Star = activeStar > i ? YellowStar : StarWhite;
    return (
      <TouchableOpacity
        disabled={!onRating}
        onPress={() => onRating(i + 1)}
        style={[Styles.starContainer, starContainerStyle]}>
        <Star height={starSize} width={starSize} />
      </TouchableOpacity>
    );
  };
  return (
    <View style={[Styles.containerStyle, containerStyle]}>
      {new Array(maxStar).fill(1).map(SingleStar)}
    </View>
  );
};

RatingComponent.defaultProps = {
  containerStyle: {},
  maxStar: 5,
  activeStar: 3,
  onRating: () => null,
  starContainerStyle: {},
  starSize: getHp(33),
};
export default RatingComponent;
