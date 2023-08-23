import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import BlurView from '../../../BlurView';
import Styles from './indexCss';

class ConfirmationPopupFrame extends Component {
  constructor(props) {
    super(props);
  }
  RenderActionsButtons = props => {
    return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[Styles.actionButtons, {backgroundColor: props.color}]}>
        <Text style={[Styles.actionButtonsText, {color: props.textColor}]}>
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
    const {props} = this;
    return (
      <View style={[Styles.popupContainer]}>
        <Text style={Styles.logoutText}>{`${props.title}`}</Text>
        <View style={[Styles.buttonsTray]}>
          <RenderActionsButtons
            textColor={'#FF2E00'}
            color={'rgba(255, 46, 0, 0.13)'}
            title={'Cancel'}
            {...props.button1Props}
          />
          <RenderActionsButtons
            textColor={'#1FAEF7'}
            color={'rgba(31, 174, 247, 0.16)'}
            title={'Confirm'}
            {...props.button2Props}
          />
        </View>
      </View>
    );
  };
  render() {
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

export default ConfirmationPopupFrame;
