import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {getHp, getWp} from '../../../app/utils';
import {CloseGreyCircularSvg} from '@svg';
import VendorReviewTile from '../VendorReviewTile';
import {VendorService} from '../../../app/services';
const VendorNotificationReviewTile = props => {
  const {reviewData} = props;

  const onRemoveReview = async () => {
    try {
      await VendorService.removeRatingNotification(reviewData.id);
    } catch (error) {}
  };
  return (
    <View>
      <VendorReviewTile
        containerStyle={[Styles.vendorReivewTileContainer]}
        reviewData={reviewData}
      />
      <TouchableOpacity
        onPress={onRemoveReview} 
        style={[Styles.closeButtonContainer]}>
        <CloseGreyCircularSvg height={getHp(24)} width={getWp(24)} />
      </TouchableOpacity>
    </View>
  );
};

const Styles = StyleSheet.create({
  vendorReivewTileContainer: {
    backgroundColor: 'white',
    borderRadius: getHp(25),
    marginBottom: getHp(10),
    paddingHorizontal: getWp(12),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  closeButtonContainer: {
    position: 'absolute',
    right: getWp(15),
    top: getHp(15),
  },
});
VendorNotificationReviewTile.defaultProps = {
  reviewData: {},
};
export default VendorNotificationReviewTile;
