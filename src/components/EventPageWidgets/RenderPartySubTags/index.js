import React, {Fragment} from 'react';
import {Text, View} from 'react-native';

import Styles from './indexCss';
import {getWp, PartyUtils} from '../../../app/utils';
import {ToggleSubTagTile} from '../../ListTiles';
const RenderPartySubTags = props => {
  const {containerStyle, party, maxRender} = props;
  const partySubTags = PartyUtils.extractPartySubTags(party);

  let component = null;
  if (partySubTags.length <= maxRender) {
    component = partySubTags.map(p => <ToggleSubTagTile data={p} withEmoji containerStyle={{marginRight:getWp(6)}}/>);
  } else {
    component = (
      <Fragment>
        <ToggleSubTagTile data={partySubTags[0]} withEmoji containerStyle={{marginRight:getWp(6)}}/>
        <ToggleSubTagTile data={{name: `${partySubTags.length - 1} more...`}} />
      </Fragment>
    );
  }
  return <View style={[Styles.container, containerStyle]}>{component}</View>;
};

export default RenderPartySubTags;
