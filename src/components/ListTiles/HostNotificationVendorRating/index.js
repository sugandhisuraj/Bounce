import React from 'react';
import {Text, View} from 'react-native';
import {getHp, getWp} from '../../../app/utils';

import Styles from './indexCss';
import VendorToggleTile from '../ToggleVendorTile';
import {RatingComponent} from '../..';
import UserToVendorRatingScreen from '../../../Screens/BounceUsers/UserToVendorRatingScreen';
import {AppNotificationService, VendorService} from '../../../app/services';
import ToastUtil from '../../../app/constants/toast';
import MobxStore from '../../../mobx';

const HostNotificationVendorRating = props => {
  const {containerStyle, vendorRequest} = props;

  const vendor = vendorRequest?.vendor ?? {};
  const party = vendorRequest?.party ?? {};

  const onClosePress = async () => {
    try {
      MobxStore.toggleLoader(true);
      const res = await VendorService.removeCohostVendorRatingNotification(
        vendorRequest.id,
      );
      await AppNotificationService.getUserNotification();
      ToastUtil('Notification Successfully Removed!');
    } catch (error) {
      ToastUtil('Something went wrong! Try Again');
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onRatingSelect = ratingSelected => {
    props.navigation.navigate(UserToVendorRatingScreen.routeName, {
      vendor,
      party,
      ratingSelected,
      onSuccessRating: async () => {
        await AppNotificationService.getUserNotification();
      },
    });
  };
  return (
    <View style={[Styles.container, containerStyle]}>
      <VendorToggleTile
        avatar={vendor?.profileImage?.filePath}
        title={vendor?.fullName ?? ''}
        subTitle={'select a star to leave your rating'}
        shouldOnClose={true}
        tileTitleContainerStyle={{width: '78%'}}
        tileContainerStyle={{paddingHorizontal: getWp(15)}}
        tileSubTitleStyle={[Styles.tileSubTitleStyle]}
        onClosePress={onClosePress}
      />
      <RatingComponent
        activeStar={0}
        onRating={onRatingSelect}
        containerStyle={{
          alignSelf: 'center',
          marginTop: getHp(20),
        }}
      />
    </View>
  );
};
HostNotificationVendorRating.defaultProps = {
  containerStyle: {},
  vendorRequest: {},
};
export default HostNotificationVendorRating;
