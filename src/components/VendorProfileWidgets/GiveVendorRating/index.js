import React from 'react';
import {View, Text} from 'react-native';

import {RatingComponent} from '../../';
import Styles from './indexCss';
const GiveVendorRating = props => {
  const {partyTitle, containerStyle, onRatingPress} = props;
  return (
    <View style={[Styles.bottomRatingContainer, containerStyle]}>
      <Text style={[Styles.leaveYourRatingText]}>
        {`Leave your rating for ${partyTitle}`}
      </Text>
      <RatingComponent
        activeStar={0}
        onRating={onRatingPress}
        containerStyle={[Styles.ratingContainerStyle]}
      />
    </View>
  );
};

GiveVendorRating.defaultProps = {
  partyTitle: '',
  containerStyle: {},
  onRatingPress: () => null,
};
export default GiveVendorRating;
