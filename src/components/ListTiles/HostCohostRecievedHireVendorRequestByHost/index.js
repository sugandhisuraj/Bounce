import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {observer} from 'mobx-react';

import {PlusThinkWhite, RedHeart, GreyHeart, CohostRoundSvg} from '@svg';
import {getHp, getWp, FONTFAMILY, FONTSIZE} from '../../../app/utils';
import {ToggleIconButton} from '../../Buttons';
import VendorToggleTile from '../ToggleVendorTile';
import Styles from './indexCss';
import {VendorFieldsData} from '../../../app/constants';
import SingleVendorProfileScreen from '../../../Screens/BounceUsers/SingleVendorProfileScreen';
import HireVendorStrore from '../../../Screens/BounceVendors/PlanParty/ChooseVendor/HIreVendorStore';
import MobxStore from '../../../mobx';
import {VendorService} from '../../../app/services';

const HostCohostRecievedHireVendorRequestByHost = props => {
  const {mode: OprModes} = HostCohostRecievedHireVendorRequestByHost;
  const {vendorRequest, mode} = props;
  let partyCreator = vendorRequest?.party?.creator;
  let party = vendorRequest?.party;
  let vendor = vendorRequest?.vendor;
  const vendorCategoryData = VendorFieldsData.VendorFieldsData.getCategory(
    vendor.vendorType,
  );
  let partyTitle = party?.title ?? '';
  if (partyTitle.length > 10) {
    partyTitle = partyTitle.substr(0, 10) + '...';
  }

  let upperTileName = '';
  let upperTileImg = null;
  let infoTextMessage = '';
  let avatarToolTipComponent = null;
  if (mode == OprModes.forCohost || mode == OprModes.forHostHiredThisVendor) {
    upperTileName = partyCreator?.fullName ?? '';
    upperTileImg = partyCreator?.profileImage?.filePath ?? null;
    infoTextMessage = `recieved your hire request for ${partyTitle}`;
    if (mode == OprModes.forHostHiredThisVendor) {
      infoTextMessage = `hired this vendor`;
    }
  } else {
    upperTileName = vendorRequest?.host?.fullName ?? '';
    upperTileImg = vendorRequest?.host?.profileImage?.filePath ?? null;
    avatarToolTipComponent = <CohostRoundSvg />;
    infoTextMessage = `sent a message request for ${partyTitle}`;
  }

  const navigateToVendorProfile = async () => {
    props.navigation.navigate(SingleVendorProfileScreen.routeName, {
      vendorRequest,
    });
  };

  const onVendorFavouritePress = async vendorData => {
    try {
      MobxStore.toggleLoader(true);
      const toggleFavVendor = await VendorService.toggleFavVendor(vendor.id);
      await VendorService.setFavoritesVendor();
    } catch (error) {
      MobxStore.toggleLoader(false);
      ToastUtil(
        error?.message ??
          error?.response?.data?.message ??
          'Something went wrong! Try Again',
      );
    }
  };

  const onClosePress = () => {
    let endPoint = 'deleteCohostSentToCreatorNotification/';
    if (mode == OprModes.forCohost) {
      endPoint = 'deleteCohostReceivedRequestNotification/';
    } else if (mode == OprModes.forHostHiredThisVendor) {
      endPoint = 'deleteCohostHiredNotificaiton/';
    }
    VendorService.onRemoveHireVendorNotifications(endPoint + vendorRequest.id);
  };
  const FavVendorSvg = HireVendorStrore.getInstance().isThisVendorFavorite(
    vendor.id,
  )
    ? RedHeart
    : GreyHeart;

  return (
    <View style={[Styles.tileContainerStyle]}>
      <VendorToggleTile
        avatar={upperTileImg}
        title={upperTileName ?? ''}
        subTitle={infoTextMessage}
        shouldOnClose={true}
        tileTitleContainerStyle={{width: '78%'}}
        tileContainerStyle={{paddingHorizontal: getWp(15)}}
        tileSubTitleStyle={[Styles.tileSubTitleStyle]}
        avatarToolTipComponent={() => avatarToolTipComponent}
        onClosePress={onClosePress}
      />
      <VendorToggleTile
        avatar={vendor?.profileImage?.filePath ?? null}
        title={vendor?.fullName ?? ''}
        subTitle={vendorCategoryData?.vendorCategory ?? ''}
        RightComponent={() => (
          <TouchableOpacity onPress={onVendorFavouritePress}>
            <FavVendorSvg />
          </TouchableOpacity>
        )}
        tileContainerStyle={Styles.vendorTileTitleContainerStyle}
        tileTitleContainerStyle={Styles.vendorTileTileTitleContainerStyle}
        tileSubTitleStyle={[Styles.tileSubTitleStyle]}
        onAvatarPress={navigateToVendorProfile}
        onTitlePress={navigateToVendorProfile}
      />
    </View>
  );
};

HostCohostRecievedHireVendorRequestByHost.mode = {};
HostCohostRecievedHireVendorRequestByHost.mode.forCohost = 'forCohost';
HostCohostRecievedHireVendorRequestByHost.mode.forHost = 'forHost';
HostCohostRecievedHireVendorRequestByHost.mode.forHostHiredThisVendor =
  'forHostHiredThisVendor';
HostCohostRecievedHireVendorRequestByHost.defaultProps = {
  mode: HostCohostRecievedHireVendorRequestByHost.mode.forHost,
};
export default observer(HostCohostRecievedHireVendorRequestByHost);
