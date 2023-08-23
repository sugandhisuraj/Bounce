import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import {Avatar} from 'react-native-elements';
import {observer} from 'mobx-react';

import {Placeholder} from '../../../assets';
import {getHp, wait} from '../../../app/utils';
import BottomRoundBlurView from '../Frames/BottomRoundBlurView';
import Styles from './indexCss';
import {Buttons} from '../..';
import MobxStore from '../../../mobx';
import ToastUtil from '../../../app/constants/toast';

function ReportBlockPopups() {
  const popupData = MobxStore.popupStore.reportBlockPopup;

  if (!popupData.visible) {
    return null;
  }
  let uiData;
  if (popupData.type == ReportBlockPopups.popupType.ReportParty) {
    uiData = ReportBlockPopups.ReportParty(popupData);
  } else {
    uiData = ReportBlockPopups.BlockUser(popupData);
  }
  return (
    <Fragment>
      <BottomRoundBlurView
        onClosePress={popupData.resetPopup}
        showClose={true}
        bottomViewContainerStyle={[Styles.bottomViewContainerStyle]}>
        <Avatar rounded source={uiData.avatar} size={getHp(65)} />
        <Text style={[Styles.flagPartyText]}>{uiData.infoText}</Text>
        <Buttons.PrimaryButton
          onPress={uiData.onPress}
          title={uiData.actionTitle}
          withShadow={false}
          containerStyle={[Styles.actionButtonContainer]}
          titleStyle={[Styles.actionTitleStyle]}
        />
      </BottomRoundBlurView>
    </Fragment>
  );
}

ReportBlockPopups.ReportParty = function (popupData) {
  let returnData = {};
  returnData.avatar = Placeholder;
  if (popupData.partyData?.profileImage?.filePath) {
    returnData.avatar = {uri: popupData.partyData?.profileImage?.filePath};
  }
  let partyName = popupData.partyData.title;
  //partyName = `Tzofim Gala: 10 Year Anniversary`;
  if (partyName.length > 22) {
    partyName = partyName.substr(0, 22) + '...';
  }
  returnData.infoText = `Would you like to flag “${partyName}”?`;
  returnData.onPress = async () => {
    MobxStore.toggleLoader(true);
    await wait(3000);
    ToastUtil('You have successfully reported to party!', {
      duration: 2000
    });
    MobxStore.toggleLoader(false);
    popupData.resetPopup();
  };
  returnData.actionTitle = 'Report';
  return returnData;
};

ReportBlockPopups.BlockUser = function (popupData) {
  let returnData = {};
  returnData.avatar = Placeholder;
  if (popupData.guestUser?.profileImage?.filePath) {
    returnData.avatar = {uri: popupData.guestUser?.profileImage?.filePath};
  }
  let title = popupData.guestUser.username;
  //partyName = `Tzofim Gala: 10 Year Anniversary`;
  if (title.length > 22) {
    title = title.substr(0, 22) + '...';
  }
  returnData.infoText = `Would you like to block @${title}?`;
  returnData.onPress = popupData.onPress;
  returnData.actionTitle = popupData?.isBlocked
    ? 'Unblock'
    : 'Block';
  return returnData;
};
ReportBlockPopups.popupType = {};
ReportBlockPopups.popupType.BlockUser = 'BlockUser';
ReportBlockPopups.popupType.ReportParty = 'ReportParty';
export default observer(ReportBlockPopups);
