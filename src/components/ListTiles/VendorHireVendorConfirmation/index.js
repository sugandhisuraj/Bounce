import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import moment from 'moment';
import {RegexCollection} from '../../../app/constants';
import Styles from './indexCss';
import MobxStore from '../../../mobx';

import AvatarWithUsername from '../../AvatarWithUsername';
import ToastUtil from '../../../app/constants/toast';
import {wait} from '../../../app/utils';
import {AppNotificationService, VendorService} from '../../../app/services';
import VendorConfirmHostHireVendorPopups from '../../AppPopups/VendorConfirmHostHireVendorPopups';

const VendorHireVendorConfirmation = props => {
  const {popupStore} = MobxStore;
  const {containerStyle, vendorRequestData} = props;

  let partyId = vendorRequestData?.party?.id;
  let partyTime = vendorRequestData?.party?.date;
  let partyTitle = vendorRequestData?.party?.title ?? '';
  let userName = vendorRequestData?.host?.fullName;
  let vendorName = vendorRequestData?.vendor?.fullName ?? 'NA';
  let userProfile = vendorRequestData?.host?.profileImage?.filePath ?? null;
  let userPhone = vendorRequestData?.host?.phoneNumber ?? '';
  let partyDateTimeFormat = moment
    .utc(partyTime)
    .format(RegexCollection.PartyInviteFormat);

  const onAcceptVendorRequest = async () => {
    try {
      popupStore.resetVendorConfirmHostHireVendorPopup();
      await wait(500);
      MobxStore.toggleLoader(true);
      const acceptVendorRes =
        await VendorService.acceptHireVendorRequestByVendor(partyId);
      await AppNotificationService.getVendorNotification();
      ToastUtil('Request Successfully Accepted');
    } catch (error) {
      let err =
        error?.message ??
        error?.response?.data?.message ??
        'Something went wrong! Try Again';
      ToastUtil(err);
    } finally {
      MobxStore.toggleLoader(false);
    }
  };
  const onActionsPress = async type => {
    if (type == VendorHireVendorConfirmation.actions.Accept) {
      popupStore.setVendorConfirmHostHireVendorPopup({
        type: VendorConfirmHostHireVendorPopups.popupType.Accept,
        visible: true,
        vendorRequestData,
        onAccept: onAcceptVendorRequest,
      });
      return;
    } else {
      popupStore.setVendorConfirmHostHireVendorPopup({
        type: VendorConfirmHostHireVendorPopups.popupType.Deny,
        visible: true,
        vendorRequestData,
        onDeny: async () => {
          try {
            popupStore.resetVendorConfirmHostHireVendorPopup();
            MobxStore.toggleLoader(true);
            const denyRequestRes =
              await VendorService.denyHireVendorRequestByVendor(partyId);
            await AppNotificationService.getVendorNotification();
            ToastUtil('Request Successfully Denied');
          } catch (error) {
            let err =
              error?.message ??
              error?.response?.data?.message ??
              'Something went wrong! Try Again';
            ToastUtil(err);
          } finally {
            MobxStore.toggleLoader(false);
          }
        },
      });
    }
  };
  const ButtonsPress = btnProps => {
    const {title, onPress, textColor} = btnProps;
    return (
      <TouchableOpacity onPress={onPress} style={[Styles.pressButtonStyle]}>
        <Text style={[Styles.btnText, {color: textColor}]}>{title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={[Styles.container, containerStyle]}>
      <AvatarWithUsername
        avatarSrc={userProfile}
        userName={userName}
        hintText={'requested you'}
      />

      <View style={[Styles.partyDetailContainer]}>
        <Text style={[Styles.inviteDetailText, Styles.invitePartyText]}>
          {partyTitle}
        </Text>
        <Text style={[Styles.inviteDetailText]}>{partyDateTimeFormat}</Text>
      </View>

      <View style={[Styles.buttonTrayContainer]}>
        <ButtonsPress
          title={'Accept'}
          textColor={'#00E08F'}
          onPress={() =>
            onActionsPress(VendorHireVendorConfirmation.actions.Accept, {})
          }
        />
        <ButtonsPress
          title={'Deny'}
          textColor={'#FF2E00'}
          onPress={() =>
            onActionsPress(VendorHireVendorConfirmation.actions.Deny, {})
          }
        />
      </View>
    </View>
  );
};

VendorHireVendorConfirmation.defaultProps = {
  onActionsPress: () => false,
  containerStyle: {},
};
VendorHireVendorConfirmation.actions = {};
VendorHireVendorConfirmation.actions.Accept = 'Accept';
VendorHireVendorConfirmation.actions.Deny = 'Deny';
export default VendorHireVendorConfirmation;
