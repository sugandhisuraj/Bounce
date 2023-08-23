import React, {Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import moment from 'moment';

import {
  FileMIMETypesUtils,
  PartyUtils,
  insertPeriodInString,
} from '../../../app/utils';
import PartyPublicParivateTag from '../PartyPublicPrivateTag';
import {RegexCollection} from '../../../app/constants';
import RenderPartySubTags from '../RenderPartySubTags';
import RenderPartyImageOrVideo from '../RenderPartyImageOrVideo';
import Styles from './indexCss';

const PartyInfoTile = props => {
  const {containerStyle, party, onPress} = props;
  const partyDateTime = party?.date
    ? moment.utc(party?.date).format(RegexCollection.PartyTimeFormat)
    : '';
  let address = '';
  if (party?.location?.addressStr) {
    address = party.location.addressStr.replace(/\r?\n|\r/g, ' ');
    address = insertPeriodInString(address, 30);
  }
  const PublicPrivateTags = PartyPublicParivateTag({party});

  const RenderStatus = () => {
    if (party?.isDraft && party?.isPrivate) {
      return (
        <Fragment>
          <PublicPrivateTags.DraftView
            containerStyle={{position: 'absolute', top: 0}}
          />
          <PublicPrivateTags.PrivateView
            containerStyle={{position: 'absolute', bottom: 0}}
          />
        </Fragment>
      );
    }
    if (party?.isDraft) {
      return (
        <PublicPrivateTags.DraftView containerStyle={Styles.onlyDraftView} />
      );
    }
    if (party?.isPrivate) {
      return (
        <PublicPrivateTags.PrivateView
          containerStyle={Styles.onlyPrivateView}
        />
      );
    }
    return null;
  };
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={() => onPress(party)}
      style={[Styles.container, containerStyle]}>
      <View style={{width: '32%'}}>
        <RenderPartyImageOrVideo
          gallery={party?.gallery ?? []}
          sourceStyle={{
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
          }}
        />
        {RenderStatus()}
      </View>
      <View style={[Styles.rightContainer]}>
        <Text style={[Styles.partyTitleStyle]}>{party.title}</Text>
        <Text style={[Styles.partyAddressStyle]}>{address ?? ''}</Text>
        <Text style={[Styles.partyAddressStyle]}>{partyDateTime ?? ''}</Text>
        {RenderPartySubTags({
          party,
          maxRender: 2,
          containerStyle: Styles.partySubTagContainerStyle,
        })}
      </View>
    </TouchableOpacity>
  );
};

export default PartyInfoTile;
