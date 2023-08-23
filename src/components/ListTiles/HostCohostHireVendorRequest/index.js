import React from 'react';
import {TextInput, Linking, View, TouchableOpacity} from 'react-native';

import {PlusThinkWhite, CohostRoundSvg} from '@svg';

import ToastUtil from '../../../app/constants/toast';
import {VendorService, AppNotificationService} from '../../../app/services';
import {getHp, getWp, FONTFAMILY, FONTSIZE} from '../../../app/utils';
import {ToggleIconButton} from '../../Buttons';
import VendorToggleTile from '../ToggleVendorTile';
import Styles from './indexCss';
import {VendorFieldsData} from '../../../app/constants';
import MobxStore from '../../../mobx';
import SingleVendorProfileScreen from '../../../Screens/BounceUsers/SingleVendorProfileScreen';

const HostCohostHireVendorRequest = props => {
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
  let vendorPhone = vendorRequest?.vendor?.phoneNumber ?? '';
  let avatarToolTipComponent = <CohostRoundSvg />;
  let infoTextMessage = `wants to hire this vendor for ${partyTitle}`;

  const navigateToVendorProfile = async () => {
    props.navigation.navigate(SingleVendorProfileScreen.routeName, {
      vendorRequest,
    });
  };
  const onHireVendorPress = async () => {
    // if (vendorRequestStatus == 1) {
    //   return ToastUtil('Under Development');
    // }
    MobxStore.toggleLoader(true);
    const hireVendorReq = await VendorService.hireVendorByHost(
      vendor?.id,
      party?.id,
    );
    await AppNotificationService.getUserNotification();
    ToastUtil('Request for Hire Vendor Send Successfully!');
    try {
    } catch (error) {
      let msg =
        error?.message ??
        error?.response?.data?.message ??
        'Something went wrong! Try Again';
      ToastUtil(msg);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onClosePress = async () => {
    let endPoint = 'deleteCohostSentToCreatorHireNotificaiton/';
    VendorService.onRemoveHireVendorNotifications(endPoint + vendorRequest.id);
  };
  return (
    <View style={[Styles.tileContainerStyle]}>
      <VendorToggleTile
        avatar={vendorRequest?.host?.profileImage?.filePath ?? null}
        title={vendorRequest?.host?.fullName ?? ''}
        subTitle={infoTextMessage}
        shouldOnClose={true}
        tileTitleContainerStyle={{width: '78%'}}
        tileContainerStyle={{paddingHorizontal: getWp(15)}}
        tileSubTitleStyle={[Styles.tileSubTitleStyle]}
        avatarToolTipComponent={() => avatarToolTipComponent}
        onClosePress={onClosePress}
      />
      <View style={{marginTop: getHp(13)}} />
      <VendorToggleTile
        avatar={vendor?.profileImage?.filePath ?? null}
        title={vendor?.fullName ?? ''}
        subTitle={vendorCategoryData?.vendorCategory ?? ''}
        RightComponent={() => (
          <ToggleIconButton
            title={'Hire'}
            containerStyle={Styles.thinkRequestContainerStyle}
            titleStyle={Styles.thinkRequestTitleStyle}
            onPress={onHireVendorPress}
          />
        )}
        tileContainerStyle={Styles.vendorTileTitleContainerStyle}
        tileTitleContainerStyle={Styles.vendorTileTileTitleContainerStyle}
        tileSubTitleStyle={[Styles.tileSubTitleStyle]}
        onAvatarPress={navigateToVendorProfile}
        onTitlePress={navigateToVendorProfile}
      />
      <TouchableOpacity
        onPress={() => Linking.openURL(`sms:${vendorPhone}`)}
        style={{backgroundColor: 'white'}}>
        <TextInput
          pointerEvents={'none'}
          value={'Message'}
          editable={false}
          style={[Styles.messageInputStyle]}
        />
      </TouchableOpacity>
    </View>
  );
};

HostCohostHireVendorRequest.defaultProps = {};
export default HostCohostHireVendorRequest;
