import React, {Fragment} from 'react';
import {Text} from 'react-native';
import {observer} from 'mobx-react';

import UnfriendPopup from './UnfriendPopup';
import ConfirmationPopups from './ConfirmationPopups';
import VendorConfirmHostHireVendorPopup from './VendorConfirmHostHireVendorPopups';
import HostHireVendorPopups from './HostHireVendorPopups';
import NewsFeedPopups from './NewsFeedPopups';
import ReportBlockPopups from './ReportBlockPopups';
import UserAgreementPopup from './UserAgreementPopup';

const RenderAllPopups = () => { 
  return (
    <Fragment>
      <ConfirmationPopups />
      <UnfriendPopup />
      <VendorConfirmHostHireVendorPopup />
      <HostHireVendorPopups />
      {/* <InfoBlurView /> */}
      <NewsFeedPopups />
      <ReportBlockPopups />
      {/* <UserAgreementPopup /> */}
    </Fragment>
  );
};

export default observer(RenderAllPopups);
