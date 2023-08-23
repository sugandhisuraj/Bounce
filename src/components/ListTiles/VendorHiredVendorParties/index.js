import React from 'react';
import {View, Text} from 'react-native';
import moment from 'moment';
import QRCodeScanner from 'react-native-qrcode-scanner';

import {Buttons, Carousels, EventPageWidgets, Placeholder} from '../..';
import {RegexCollection} from '../../../app/constants';
import AvatarWithUsername from '../../AvatarWithUsername';
import {WhiteCalender, Scanner, DirectionBlue} from '@svg';
import Styles from './indexCss';
import {getHp, FONTSIZE, getWp, FONTFAMILY} from '../../../app/utils';
import NavigationService from '../../../navigation/NavigationService';
import ScanTicketsScreen from '../../../Screens/BounceVendors/ScanTickets';
const VendorHiredVendorParties = props => {
  const {partyData, containerStyle} = props; 
  const party = partyData.party;

  let allGalleryImages = party?.gallery?.map(i => i.filePath) ?? [];
  let partyCreatorAvatar = party?.creator?.profileImage?.filePath ?? null;

  const onScanTickets = () => {
    NavigationService.navigate(ScanTicketsScreen.routeName, {
      partyData
    });
  }
  return (
    <View style={[Styles.container, containerStyle]}>
      <AvatarWithUsername
        containerStyle={[Styles.avatarWithUserNameContainer]}
        avatarSrc={partyCreatorAvatar}
        userName={party.creator?.fullName}
      />
      <EventPageWidgets.PartyImgCarousalWithPartyDateTime
        containerStyle={{marginVertical: getHp(12)}}
        partyData={party}
        withBackEdit={false}
      />
      <View style={Styles.upperActionContainer}>
        <Buttons.ToggleIconButton
          Icon={<WhiteCalender />}
          containerStyle={[Styles.calenderTicketContainerStyle]}
          title={'Add To Calender'}
          titleStyle={[Styles.calenderTicketTitleStyle]}
        />
        <Buttons.ToggleIconButton
        onPress={onScanTickets}
          Icon={<Scanner />}
          title={'Scan Tickets      '}
          containerStyle={[Styles.calenderTicketContainerStyle]}
          titleStyle={[Styles.calenderTicketTitleStyle]}
        />
      </View>

      <EventPageWidgets.PartyAddressWidget
        addressTextContainer={{
          marginHorizontal: getHp(15),
          marginVertical: getHp(13),
        }}
        currentParty={party}
      />
      <Buttons.PrimaryButton
        containerStyle={[Styles.requestPaymentContainer]}
        withShadow={false}
        title={'Request Payment'}
        titleStyle={[Styles.requestPaymentTitle]}
      />
    </View>
  );
};

VendorHiredVendorParties.defaultProps = {
  containerStyle: {},
};
export default VendorHiredVendorParties;
