import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Linking} from 'react-native';
import moment from 'moment';

import {RegexCollection} from '../../../app/constants';
import {CloseGreyCircularSvg} from '@svg';
import Styles from './indexCss';
import AvatarWithUsername from '../../AvatarWithUsername';
import {RoundedView} from '../..';
import { VendorService } from '../../../app/services';

const VendorHireVendorRequest = props => {
  const {containerStyle, vendorRequestData} = props;

  let partyTime = vendorRequestData?.party?.date;
  let partyTitle = vendorRequestData?.party?.title ?? '';
  let userName = vendorRequestData?.host?.fullName;
  let vendorName = vendorRequestData?.vendor?.fullName ?? 'NA';
  let userProfile = vendorRequestData?.host?.profileImage?.filePath ?? null;
  let userPhone = vendorRequestData?.host?.phoneNumber ?? '';
  let partyDateFormat = moment.utc(partyTime).format('ddd. MMMM D');
  let partyTimeFormat = moment.utc(partyTime).format('hh:mm A');

  const onClosePress = () => {
    let endPoint = 'deleteVendorMessageNotificaiton/'; 
    VendorService.onRemoveHireVendorNotifications(endPoint + vendorRequestData.id, true);
  };

  return (
    <RoundedView
      withShadow={true}
      containerStyle={[Styles.container, containerStyle]}>
      <View style={[Styles.avatarWithUsernameContainer]}>
        <AvatarWithUsername
          avatarSrc={userProfile}
          userName={userName}
          hintText={null}
        />
        <TouchableOpacity onPress={onClosePress}>
          <CloseGreyCircularSvg />
        </TouchableOpacity>
      </View>
      <Text style={[Styles.requestInfoText]}>
        {`Hi ${vendorName}, \nAre you available for my event, ${partyTitle}, on ${partyDateFormat} at ${partyTimeFormat} ?`}
      </Text>
      <TouchableOpacity onPress={() => Linking.openURL(`sms:${userPhone}`)}>
      <TextInput
      pointerEvents={'none'}
        value={'Message'}
        editable={false}
        style={[Styles.messageInputStyle]}
      />
      </TouchableOpacity>
    </RoundedView>
  );
};

VendorHireVendorRequest.defaultProps = {
  containerStyle: {},
};
export default VendorHireVendorRequest;
