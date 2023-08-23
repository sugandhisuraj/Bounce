import React from 'react';
import HostView from '../../../Screens/BounceVendors/PlanParty/HostView';

import {getHp} from '../../../app/utils';
import PartyImgCarousalWithPartyDateTime from '../PartyImgCarousalWithPartyDateTime';
import CreateInvitation from '../../../Screens/BounceVendors/PlanParty/CreateInvitation';
const PartyImageCarousalWithBackAndEdit = props => {
  const {partyData, loadCurrentParty} = props;
  return <PartyImgCarousalWithPartyDateTime {...props} partyData={partyData} />;
};

export default PartyImageCarousalWithBackAndEdit;
