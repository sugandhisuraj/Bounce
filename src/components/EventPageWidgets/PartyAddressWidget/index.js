import React from 'react';
import {StyleSheet, Linking, Platform} from 'react-native';
import styled from 'styled-components/native';

import {FONTFAMILY, FONTSIZE, getHp} from '../../../app/utils';
import {DirectionBlue, Location} from '@svg';
import {Placeholder} from '../..';
import openMap from 'react-native-open-maps';
import * as Buttons from '../../Buttons';
import ToastUtil from '../../../app/constants/toast';

const styledComponent = styled.TouchableOpacity`
  box-shadow: 0px 0px 11px rgba(0, 0, 0, 0.11);
`;

const PartyAddressWidget = props => {
  const {currentParty, addressTextContainer, textRenderLength} = props;

  let partyAddress = currentParty?.location?.addressStr;
  //partyAddress = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`
  if (partyAddress.length > textRenderLength) {
    partyAddress = partyAddress.substr(0, textRenderLength) + '...';
  }

  const openGoogleOrAppleMap = async () => {
    const partyTitle = currentParty?.title;
    const lat = +currentParty.location.lat;
    const lng = +currentParty.location.lon;
    // openMap({ latitude, longitude, navigate:true,});
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = partyTitle;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });
    try {
      const canOpenLink = await Linking.canOpenURL(url);
      if (!canOpenLink) {
        throw new Error(`Can't open map!`);
      }
      Linking.openURL(url);
    } catch (error) {
      ToastUtil(error?.message ?? 'Something went wrong!');
    }
  };
  return (
    <Buttons.VerticalIcon
      styledComponent={styledComponent}
      containerStyle={[Styles.verticalIconContainer, {paddingTop: getHp(3)}]}
      Icon={<Location height={getHp(55)} width={getHp(55)} style={{ marginTop: -12}} />}
      title={"15 min."}
      onPress={openGoogleOrAppleMap}
      titleStyle={[{marginTop: -12, color: '#FFF'}]}
    />
    /* <Placeholder.IconText
      onPress={
        openGoogleOrAppleMap
        // NavigationService.navigate(NavigationToEventScreen.routeName, {
        //   partyData: currentParty,
        // })
      }
      containerStyle={[Styles.addressTextContainer, addressTextContainer]}
      icon={<DirectionBlue height={getHp(22)} width={getHp(22)} />}
      text={partyAddress}
      textStyle={[Styles.addressTextStyle]}
      textRenderLength={textRenderLength}
    /> */
  );
};

const Styles = StyleSheet.create({
  addressTextContainer: {
    ...Platform.select({android: {shadowColor: 'black'}, ios: {}}),
    elevation: 2,
    justifyContent: 'flex-start',
    backgroundColor: '#FFF',
    opacity: 0.9,
  },
  addressTextStyle: {
    letterSpacing: 0.4,
    fontWeight: '400',
    fontSize: FONTSIZE.Text15,
    textDecorationLine: 'underline',
    fontFamily: FONTFAMILY.AvenirNextBold,
    flexWrap: 'wrap',
  },
  verticalIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: getHp(60),
    width: getHp(80),
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    opacity: 0.9,
    ...Platform.select({
      android: {
        shadowColor: '#000',
        elevation: 2.8,
      },
      ios: {},
    }),
  },
});
export default PartyAddressWidget;
