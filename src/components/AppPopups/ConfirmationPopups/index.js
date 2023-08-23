import React from 'react';
import {Text} from 'react-native';
import {observer} from 'mobx-react';
import MobxStore from '../../../mobx';
import {ConfirmationPopupFrame} from '../Frames';

const ConfirmationPopups = props => {
  const popupStore = MobxStore.popupStore;

  if (!popupStore?.confirmationPopup?.visible) {
    return null;
  }
  let resetConfirmationPopupInStore = () => {
    popupStore.resetConfirmationPopup();
  };

  onCancelPress = () => {
    if (popupStore?.confirmationPopup?.onCancel) {
      popupStore?.confirmationPopup?.onCancel();
    }
    resetConfirmationPopupInStore();
  };
  onSuccessPress = () => {
    if (popupStore?.confirmationPopup?.onSuccess) {
      popupStore?.confirmationPopup?.onSuccess();
    }
    resetConfirmationPopupInStore();
  };
  const LogoutPopup = () => {
    return (
      <ConfirmationPopupFrame
        title={'Are you sure you’d like to log out?'}
        button1Props={{
          onPress: onCancelPress,
        }}
        button2Props={{
          onPress: onSuccessPress,
        }}
      />
    );
  };
  const LeaveEventPopup = () => {
    return (
      <ConfirmationPopupFrame
        title={'Are you sure you’d like to leave event?'}
        button1Props={{
          title: 'Delete',
          onPress: onCancelPress,
        }}
        button2Props={{
          title: 'Save as Draft',
          onPress: onSuccessPress,
        }}
      />
    );
  };
  const LeaveHostProfile = () => {
    return (
      <ConfirmationPopupFrame
        title={'Are you sure you’d like to leave? All Changes will lost'}
        button1Props={{
          title: 'Yes',
          onPress: onCancelPress,
        }}
        button2Props={{
          title: 'Save Changes',
          onPress: onSuccessPress,
        }}
      />
    );
  };
  const HireVendorUnselectVendor = () => {
    return (
      <ConfirmationPopupFrame
        title={'Are you sure you’d like Unselect Vendor?'}
        button1Props={{
          title: 'No',
          onPress: onCancelPress,
        }}
        button2Props={{
          title: 'Yes',
          onPress: onSuccessPress,
        }}
      />
    );
  };
  if (
    popupStore.confirmationPopup?.type == ConfirmationPopups.popupType.Logout
  ) {
    return <LogoutPopup />;
  } else if (
    popupStore.confirmationPopup?.type ==
    ConfirmationPopups.popupType.LeaveEvent
  ) {
    return <LeaveEventPopup />;
  } else if (
    popupStore.confirmationPopup?.type ==
    ConfirmationPopups.popupType.LeaveHostProfile
  ) {
    return <LeaveHostProfile />;
  }else if (
    popupStore.confirmationPopup?.type ==
    ConfirmationPopups.popupType.HireVendorUnselectVendor
  ) {
    return <HireVendorUnselectVendor />;
  }
  return null;
};

ConfirmationPopups.popupType = {};
ConfirmationPopups.popupType.Logout = 'Logout';
ConfirmationPopups.popupType.LeaveEvent = 'LeaveEvent';
ConfirmationPopups.popupType.LeaveHostProfile = 'LeaveHostProfile';
ConfirmationPopups.popupType.HireVendorUnselectVendor = 'HireVendorUnselectVendor';

export default observer(ConfirmationPopups);
