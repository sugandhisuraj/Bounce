import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {Avatar} from 'react-native-elements';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {observer} from 'mobx-react';
import moment from 'moment';

import {RegexCollection} from '../../../app/constants';
import Styles from './indexCss';
import MobxStore from '../../../mobx';
import {Buttons} from '../../';
const VendorConfirmHostHireVendorPopups = () => {
  const popupStore = MobxStore.popupStore;
  let popupData = popupStore.vendorConfirmHostHireVendorPopup;
  if (!popupData?.visible ?? false) {
    return null;
  }

  let vendorRequestData = popupData.vendorRequestData;
  let partyTitle = vendorRequestData?.party?.title ?? '';
  let partyTime = vendorRequestData?.party?.date;
  let partyAddress = vendorRequestData?.party?.location?.addressStr ?? '';
  let partyDateTimeFormat = moment
    .utc(partyTime)
    .format(RegexCollection.PartyInviteFormat);
  //let partyAddress = vendorRequestData?.party?.
  return (
    <Modal isVisible={popupData?.visible ?? false}>
      <View style={[Styles.modalContainerSyle]}>
        <View style={[Styles.userInfoContainer]}>
          <Text style={[Styles.partyTitleStyle]}>{partyTitle}</Text>
          <Text style={[Styles.partyDateTimeFormat]}>
            {partyDateTimeFormat}
          </Text>
          <Text style={[Styles.partyDateTimeFormat]}>{partyAddress}</Text>
          {popupData.type ==
          VendorConfirmHostHireVendorPopups.popupType.Accept ? (
            <Text style={[Styles.confirmTextStyle]}>
              By confirming, you agree to work this event.
            </Text>
          ) : (
            <Text style={[Styles.confirmTextStyle]}>
              By denying, you will not work this event.
            </Text>
          )}
          {popupData.type ==
          VendorConfirmHostHireVendorPopups.popupType.Accept ? (
            <Buttons.LinearGradient
              gradientColors={['#1FAEF7', '#1FAEF7']}
              title={'Confirm'}
              showArrow={false}
              linearGradientStyle={Styles.continueButtonStyle}
              onPress={popupData.onAccept}
              titleStyle={[Styles.btnText]}
            />
          ) : (
            <TouchableOpacity
              onPress={popupData.onDeny}
              style={[Styles.pressButtonStyle]}>
              <Text style={[Styles.btnText, {color: '#FF005C'}]}>{'Deny'}</Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            popupStore.resetVendorConfirmHostHireVendorPopup();
          }}
          style={[Styles.closeButtonStyle]}>
          <AntDesign style={[Styles.closeIcon]} name={'close'} />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

VendorConfirmHostHireVendorPopups.popupType = {};
VendorConfirmHostHireVendorPopups.popupType.Deny = 'Deny';
VendorConfirmHostHireVendorPopups.popupType.Accept = 'Accept';
export default observer(VendorConfirmHostHireVendorPopups);
