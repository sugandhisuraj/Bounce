import React from 'react';
import {Text, View, TextInput, Linking, TouchableOpacity} from 'react-native';
import {Buttons} from '../..';
import {VendorService, AppNotificationService} from '../../../app/services';
import AvatarWithUsername from '../../AvatarWithUsername';
import MobxStore from '../../../mobx';
import Styles from './indexCss';
import ToastUtil from '../../../app/constants/toast';
const CohostRequestToHireVendorToHost = props => {
  const {vendorRequest} = props;

  let partyId = vendorRequest?.party?.id;
  let vendorId = vendorRequest?.vendor?.id;
  let vendorName = vendorRequest?.vendor?.fullName ?? 'NA';
  let vendorProfile = vendorRequest?.vendor?.profileImage?.filePath ?? null;
  let vendorPhone = vendorRequest?.vendor?.phoneNumber ?? '';
  let vendorRequestStatus = vendorRequest?.status;
  const onRequestToHireVendorPress = async () => {
    if (vendorRequestStatus == 1) {
      //return ToastUtil('Under Development');
    }
    MobxStore.toggleLoader(true);
    const hireVendorReq = await VendorService.cohostRequestToHireVendorToHost(
      vendorId,
      partyId,
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
  return (
    <View style={[Styles.container]}>
      <View style={[Styles.rowAvatarHireBtn]}>
        <AvatarWithUsername
          avatarSrc={vendorProfile}
          userName={`${vendorName}`}
          hintText={null}
        />
        <Buttons.LinearGradient
          gradientColors={['#00CFFF', '#00CFFF']}
          title={'Request To Hire'}
          linearGradientStyle={[Styles.hireBtn]}
          showArrow={false}
          onPress={onRequestToHireVendorPress}
          titleStyle={[
            Styles.hireButtonTitleStyle,
            vendorRequestStatus == 1 && {color: '#FF005C'},
          ]}
        />
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(`sms:${vendorPhone}`)}>
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

export default CohostRequestToHireVendorToHost;
