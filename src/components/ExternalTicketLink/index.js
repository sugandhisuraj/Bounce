import React from 'react';
import {View, Text, TouchableOpacity, Linking} from 'react-native';

import * as Menus from '../Menus';
import {BlueUrlIndicator, ThreeBlackDots, DeleteBlack} from '@svg';
import Styles from './indexCss';
import ToastUtil from '../../app/constants/toast';
import {getHp, URLUtils} from '../../app/utils';

const ExternalTicketLink = props => {
  const {
    containerStyle, 
    withShadow,
    containerTitle,
    containerTitleStyle,
    externalTicketLink,
    onEvents,
    widgetType
  } = props;
  //const externalTicketLink = partyData?.externalLink ?? null;

  if (!externalTicketLink) {
    return null;
  }
  const onPressTicketLink = async () => {
    try {
      let finalExternalLink = URLUtils.getValidUrl(externalTicketLink);
      console.log('EXTERNAL_TICKET_LINK - ', finalExternalLink);
      const canOpenLink = await Linking.canOpenURL(finalExternalLink);
      if (!canOpenLink) {
        throw {message: 'Cannot open ticket link'};
      }
      await Linking.openURL(finalExternalLink);
    } catch (error) {
      console.log('OPENING_EXTERNAL_TICKETLINK_ERROR - ', error);
      ToastUtil('Something went wrong! Try Again');
    }
  };
  const menuItems = [
    {
      Icon: <DeleteBlack />,
      title: 'Delete',
      onPress: () => {
        onEvents(ExternalTicketLink.onClickEvents.Delete);
      },
    },
  ];
  return (
    <View
      style={[
        Styles.container,
        withShadow && Styles.shadowStyle,
        containerStyle,
      ]}>
      <View style={[Styles.containerTitleView]}>
        <Text style={[Styles.containerTitle, containerTitleStyle]}>
          {containerTitle}
        </Text>
        {
          widgetType == ExternalTicketLink.widgetType.WithActions && <Menus.CommonMenu
          menuTitleTextStyle={[Styles.menuTitleTextStyle]}
          menuItemStyle={[Styles.menuItemStyle]}
          contentStyle={[Styles.menuContentStyle]}
          config={menuItems}
          menuAnchor={<ThreeBlackDots height={getHp(25)} width={getHp(25)} />}
        />
        }
      </View>
      <TouchableOpacity
        onPress={onPressTicketLink}
        style={Styles.linkUrlContainer}>
        <BlueUrlIndicator />
        <Text style={Styles.linkUrlText}>{externalTicketLink || ''}</Text>
      </TouchableOpacity>
    </View>
  );
};

ExternalTicketLink.defaultProps = {
  containerStyle: {},
  containerTitleStyle: {},
  partyData: {},
  withShadow: true,
  containerTitle: 'Add Container Title',
  externalTicketLink: 'Add External Ticket Link',
  onEvents: () => null,
};
ExternalTicketLink.onClickEvents = {};
ExternalTicketLink.onClickEvents.Delete = 'Delete';

ExternalTicketLink.widgetType = {};
ExternalTicketLink.widgetType.WithActions = 'WithActions';
export default ExternalTicketLink;
