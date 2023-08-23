import React from 'react';
import {View} from 'react-native';

import {getHp, getWp} from '../../../app/utils';
import * as ListTiles from '../../ListTiles';
import NewToggleList from '../NewToggleList';

const PartyInvites = props => {
  const {inviteTileProps, listContainerStyle,cohostInviteTileProps} = props;

  const PartyListTile = ({item}) => {
    if (item.isCohostInvite) {
      return (
        <ListTiles.CohostInviteTile
          {...cohostInviteTileProps}
          containerStyle={{paddingHorizontal: getWp(20)}}
          cohost={item}
        />
      );
    }
    return (
      <ListTiles.PartyInviteTile {...inviteTileProps} partyInvite={item} />
    );
  };
  return (
    <NewToggleList
      {...props}
      ListTile={PartyListTile}
      containerStyle={{backgroundColor: '#FBFBFB',...listContainerStyle}}
      CustomDivider={<View style={{marginVertical: getHp(4)}} />}
    />
  );
};

PartyInvites.defaultProps = {
  listContainerStyle: {},
  partyInvites: [],
  cohostInviteTileProps: {},
  inviteTileProps: {},
};
export default PartyInvites;
