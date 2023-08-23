import moment from 'moment';
import React from 'react';
import {View, Text} from 'react-native';

import FastImage from 'react-native-fast-image';
import {RegexCollection} from '../../../app/constants';
import {getHp} from '../../../app/utils';
import {Placeholder} from '../../../assets';
import Styles, {Styled, dummyPartyData} from './indexCss';

const PartyInfoTile = props => {
  let {containerStyle, onTilePress, AbsoluteComponent1} = props;
  let partyData = dummyPartyData;
  let partyImage = partyData?.profileImage?.filePath;
  let partyImageSource = Placeholder;
  if (partyImage) {
    partyImageSource = {uri: partyImage};
  }

  let partyTitle = partyData.title;
  let partyAddress = partyData.location?.addressStr ?? '';
  if (partyTitle.length > 30) {
    partyTitle = partyTitle.substr(0, 30) + '...';
  }
  if (partyAddress.length > 30) {
    partyAddress = partyAddress.substr(0, 30) + '...';
  }
  const partyDateTime = moment
    .utc(partyData.date)
    .format(RegexCollection.PartyTimeFormat);
  return (
    <Styled.WrapperContainer
      disabled={!onTilePress}
      onPress={() => onTilePress(partyData)}
      style={[Styles.container, containerStyle]}>
      <FastImage style={Styles.partyImage} source={partyImageSource} />
      <View style={[Styles.partyInfoContainer]}>
        <Text style={[Styles.partyTitleText]}>{partyTitle}</Text>
        <Text style={[Styles.partyDateTimeText, {marginTop: getHp(5)}]}>
          {partyAddress}
        </Text>
        <Text style={[Styles.partyDateTimeText, {marginTop: getHp(2)}]}>
          {partyDateTime}
        </Text>
      </View>
      {AbsoluteComponent1(partyData)}
    </Styled.WrapperContainer>
  );
};

PartyInfoTile.defaultProps = {
  containerStyle: {},
  onTilePress: null,
  partyData: {},
  AbsoluteComponent1: () => null,
};

export default PartyInfoTile;
