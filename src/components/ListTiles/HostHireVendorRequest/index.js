import React from 'react';
import {Text, View, TextInput, Linking, TouchableOpacity} from 'react-native';
import {Buttons} from '../..';
import {VendorService, AppNotificationService} from '../../../app/services';
import AvatarWithUsername from '../../AvatarWithUsername';
import MobxStore from '../../../mobx';
import Styles from './indexCss';
import ToastUtil from '../../../app/constants/toast';
import {ToggleIconButton} from '../../Buttons';
import {VendorFieldsData} from '../../../app/constants';
import VendorToggleTile from '../ToggleVendorTile';
import {getWp} from '../../../app/utils';
import {HostHireVendorPopups} from '../../AppPopups';
import SingleVendorProfileScreen from '../../../Screens/BounceUsers/SingleVendorProfileScreen';
const HostHireVendorRequest = props => {
  const {vendorRequest, mode} = props;

  let partyId = vendorRequest?.party?.id;
  let vendorId = vendorRequest?.vendor?.id;
  let vendorName = vendorRequest?.vendor?.fullName ?? 'NA';
  let vendorProfile = vendorRequest?.vendor?.profileImage?.filePath ?? null;
  let vendorPhone = vendorRequest?.vendor?.phoneNumber ?? '';

  const vendorCategoryData = VendorFieldsData.VendorFieldsData.getCategory(
    vendorRequest?.vendor.vendorType,
  );
  let btnTitle = 'Hire';
  let btnContainerStyle = Styles.thinkRequestContainerStyle;
  let btnTitleStyle = Styles.thinkRequestTitleStyle;
  if (mode == HostHireVendorRequest.modes.ForCancelHireVendor) {
    btnTitleStyle = {...btnTitleStyle, color: '#FF005C'};
    btnContainerStyle = {...btnContainerStyle, backgroundColor: '#FFE0EB'};
    btnTitle = 'Cancel Hire';
  }
  const processVendorRequest = async () => {
    try {
      MobxStore.toggleLoader(true);
      let requestRes = null;
      if (mode == HostHireVendorRequest.modes.ForHireVendor) {
        requestRes = await VendorService.hireVendorByHost(vendorId, partyId);
      } else {
        requestRes = await VendorService.cancelHireVendorByHost(
          vendorId,
          partyId,
        );
      }

      await AppNotificationService.getUserNotification();
      ToastUtil('Request for Hire Vendor Send Successfully!');
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
  const onHireVendorPress = async () => {
    if (mode == HostHireVendorRequest.modes.ForCancelHireVendor) {
      MobxStore.popupStore.setHostHireVendorCancelUnHirePopup({
        popupType: HostHireVendorPopups.popupType.CancelHire,
        visible: true,
        vendorRequest,
        onCancelHire: processVendorRequest,
      });

      return;
    }
    processVendorRequest();
  };

  const navigateToVendorProfile = async () => {
    props.navigation.navigate(SingleVendorProfileScreen.routeName, {
      vendorRequest,
    });
  };

  const onCancelRequest = async () => {
    try {
      MobxStore.toggleLoader(true);
      const cancelHireRes = await VendorService.cancelHireRequestsByHost(
        vendorRequest.id,
        partyId
      );
      await AppNotificationService.getUserNotification();
      ToastUtil('Request for Hire Vendor Send Successfully!');
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
  const onCancelRequestPress = async () => {
    MobxStore.popupStore.setHostHireVendorCancelUnHirePopup({
      popupType: HostHireVendorPopups.popupType.CancelRequest,
      visible: true,
      vendorRequest,
      onCancelRequest,
    });
  };
  return (
    <View style={[Styles.container]}>
      <VendorToggleTile
        avatar={vendorProfile}
        title={vendorName}
        subTitle={vendorCategoryData?.vendorCategory ?? ''}
        shouldOnClose={true}
        tileTitleContainerStyle={{width: '78%'}}
        onAvatarPress={navigateToVendorProfile}
        onTitlePress={navigateToVendorProfile}
        onClosePress={onCancelRequestPress}
        // tileSubTitleStyle={[Styles.tileSubTitleStyle]}
        // avatarToolTipComponent={() => avatarToolTipComponent}
      />
      {/* {
        mode == HostHireVendorRequest.modes.ForCancelHireVendor && 
        <TouchableOpacity>
          <Text>Hello</Text>
        </TouchableOpacity>
      } */}
      <View style={[Styles.bottomMessageTray]}>
        <TouchableOpacity
          style={{width: '65%'}}
          onPress={() => Linking.openURL(`sms:${vendorPhone}`)}>
          <TextInput
            pointerEvents={'none'}
            value={'Message'}
            editable={false}
            style={[Styles.messageInputStyle]}
          />
        </TouchableOpacity>
        <ToggleIconButton
          title={btnTitle}
          containerStyle={btnContainerStyle}
          titleStyle={btnTitleStyle}
          onPress={onHireVendorPress}
        />
      </View>
    </View>
  );
};

HostHireVendorRequest.modes = {};

HostHireVendorRequest.modes.ForHireVendor = 'ForHireVendor';
HostHireVendorRequest.modes.ForCancelHireVendor = 'ForCancelHireVendor';
export default HostHireVendorRequest;
