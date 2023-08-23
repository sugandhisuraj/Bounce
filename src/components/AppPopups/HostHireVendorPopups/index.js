import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {observer} from 'mobx-react';

import BlurView from '../../BlurView';
import Styles from './indexCss';
import AvatarWithUsername from '../../AvatarWithUsername';
import CenterRoundBlurView from '../Frames/CenterRoundBlurView';
import MobxStore from '../../../mobx';

class HostHireVendorPopups extends Component {
  static popupType = {
    CancelHire: 'CancelHire',
    CancelRequest: 'CancelRequest',
  };
  static PopupData = {
    [HostHireVendorPopups.popupType.CancelHire]: {
      text: `Are you sure? Once you “cancel hire” the vendor will be removed from your event page and, to hire them again, you will need to send a new request.`,
    },
    [HostHireVendorPopups.popupType.CancelRequest]: {
      text: `Are you sure? Once you “cancel request” you will no longer have direct access to message this vendor. To hire them, you will need to send a new request.`,
    },
  };
  constructor(props) {
    super(props);
  }
  RenderActionsButtons = props => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          Styles.actionButtons,
          props?.withShadow && Styles.shadowStyle,
          {backgroundColor: props.color},
        ]}>
        <Text
          style={[
            Styles.actionButtonsText,
            props.style,
            {color: props.textColor},
          ]}>
          {props.title}
        </Text>
      </TouchableOpacity>
    );
  };
  BlurRender = ({children}) => {
    return (
      <BlurView blurStyle={[Styles.blurContainer]} isVisible={true}>
        {children}
      </BlurView>
    );
  };
  ModalRender = ({children}) => {
    return <Modal isVisible={true}>{children}</Modal>;
  };
  RenderModalData = () => {
    const {RenderActionsButtons} = this;
    const {popupStore} = MobxStore;
    const currentPopup = popupStore.hostHireVendorCancelUnHirePopup;
    const popupType = currentPopup.popupType;
    const vendorRequest = currentPopup.vendorRequest;
    let infoText = HostHireVendorPopups.PopupData[popupType].text;
    return (
      <View style={[Styles.popupContainer]}>
        <AvatarWithUsername
          avatarSrc={vendorRequest?.vendor?.profileImage?.filePath ?? ''}
          userName={vendorRequest?.vendor?.fullName ?? ''}
          hintText={null}
          containerStyle={[Styles.avatarUserNameContainerStyle]}
        />
        <Text style={[Styles.popupInfoText]}>{infoText}</Text>
        <View style={[Styles.buttonsTray]}>
          <RenderActionsButtons
            withShadow
            textColor={'#00CFFF'}
            color={'#FFF'}
            title={'Go Back'}
            style={{fontWeight: '600'}}
            onPress={() => popupStore.resetHostHireVendorCancelUnHirePopup()}
          />
          {popupType == HostHireVendorPopups.popupType.CancelHire ? (
            <RenderActionsButtons
              textColor={'#FF005C'}
              color={'#FFC0D7'}
              title={'Cancel Hire'}
              style={{fontWeight: '500'}}
              onPress={() => {
                currentPopup.onCancelHire();
                popupStore.resetHostHireVendorCancelUnHirePopup();
              }}
            />
          ) : (
            <RenderActionsButtons
              textColor={'#FFFFFF'}
              color={'#00CFFF'}
              title={'Cancel Request'}
              style={{fontWeight: '600'}}
              onPress={() => {
                currentPopup.onCancelRequest();
                popupStore.resetHostHireVendorCancelUnHirePopup();
              }}
            />
          )}
        </View>
      </View>
    );
  };
  render() {
    const {popupStore} = MobxStore;
    if (!popupStore.hostHireVendorCancelUnHirePopup.visible) {
      return null;
    }
    if (Platform.OS == 'android') {
      return (
        <this.ModalRender>
          <this.RenderModalData />
        </this.ModalRender>
      );
    }
    return (
      <this.BlurRender>
        <this.RenderModalData />
      </this.BlurRender>
    );
  }
}

HostHireVendorPopups.defaultProps = {
  popupType: HostHireVendorPopups.popupType.CancelHire,
};
export default observer(HostHireVendorPopups);
