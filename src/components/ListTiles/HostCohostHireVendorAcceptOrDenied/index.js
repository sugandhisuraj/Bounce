import React from 'react';
import {Text, View} from 'react-native';

import {CloseGreenBG, CloseRedBG} from '@svg';
import {getWp, getHp} from '../../../app/utils';
import VendorToggleTile from '../ToggleVendorTile';
import Styles from './indexCss';
import {VendorService} from '../../../app/services';
const HostCohostHireVendorAcceptOrDenied = props => {
  const {vendorRequest, mode} = props;

  let avatarToolTipComponent = (
    <CloseGreenBG height={getHp(22)} width={getHp(22)} />
  );
  let statusText = 'Accepted your hire request';
  if (mode == HostCohostHireVendorAcceptOrDenied.modes.DeniedHireRequest) {
    avatarToolTipComponent = (
      <CloseRedBG height={getHp(22)} width={getHp(22)} />
    );
    statusText = 'Denied your hire request';
  }

  const onClosePress = () => {
    let endPoint = 'deleteAcceptDenyNotification/';
    VendorService.onRemoveHireVendorNotifications(endPoint + vendorRequest.id);
  };
  return (
    <View style={[Styles.container]}>
      <VendorToggleTile
        title={vendorRequest?.vendor?.fullName ?? ''}
        avatar={vendorRequest?.vendor?.profileImage?.filePath ?? null}
        subTitle={statusText}
        shouldOnClose={true}
        tileTitleContainerStyle={{width: '78%'}}
        tileContainerStyle={Styles.vendorTileContainerStyle}
        tileSubTitleStyle={[Styles.tileSubTitleStyle]}
        avatarToolTipComponent={() => avatarToolTipComponent}
        onClosePress={onClosePress}
      />
    </View>
  );
};
HostCohostHireVendorAcceptOrDenied.modes = {};
HostCohostHireVendorAcceptOrDenied.modes.AcceptedHireRequest =
  'AcceptedHireRequest';
HostCohostHireVendorAcceptOrDenied.modes.DeniedHireRequest =
  'DeniedHireRequest';
HostCohostHireVendorAcceptOrDenied.defaultProps = {
  mode: HostCohostHireVendorAcceptOrDenied.modes.AcceptedHireRequest,
};
export default HostCohostHireVendorAcceptOrDenied;
