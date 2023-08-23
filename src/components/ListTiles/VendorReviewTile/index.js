import moment from 'moment';
import React from 'react';
import {Text, View} from 'react-native';

import {RatingComponent, ToggleShowMoreText} from '../..';
import {RegexCollection} from '../../../app/constants';
import {dateTimeAgo, getHp} from '../../../app/utils';
import ToggleVendorTile from '../ToggleVendorTile';
import Styles from './indexCss';

const VendorReviewTile = props => {
  const {containerStyle, reviewData} = props;
  const user = reviewData.user;
  
  //momentCreatedData = moment('2020-09-01T09:00:11.546Z');
  const agoText = dateTimeAgo(reviewData.createdAt);

  return (
    <View style={[Styles.container, containerStyle]}>
      <ToggleVendorTile
        avatar={user?.profileImage?.filePath ?? null}
        title={user.fullName}
        subTitle={agoText}
        tileContainerStyle={[Styles.vendorTileContainerStyle]}
        tileSubTitleStyle={[Styles.vendorSubTitleStyle]}
        tileAvatarContainerStyle={{width: '17%'}}
      />
      <RatingComponent
        activeStar={reviewData.rate}
        //activeStar={5}
        onRating={null}
        containerStyle={[Styles.ratingContainerStyle]}
        starContainerStyle={Styles.starContainerStyle}
        starSize={getHp(19)}
      />
      <ToggleShowMoreText
        showMoreTextStyle={[{top: 4}]}
        descriptionTextStyle={[Styles.descriptionTextStyle]}
        containerStyle={[Styles.toggleShowMoreText]}
        text={reviewData.review}
        textLength={190}
      />
    </View>
  );
};
VendorReviewTile.defaultProps = {
  containerStyle: {},
};

export default VendorReviewTile;
