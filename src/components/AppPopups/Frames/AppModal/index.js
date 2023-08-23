import React, {Component, useEffect} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {Buttons} from '../../..';
import BlurView from '../../../BlurView';
import Styles from './indexCss';

class AppModal extends Component {
  constructor(props) {
    super(props);
  }
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
  render() {
    const {children} = this.props;
    if (Platform.OS == 'android') {
      return <this.ModalRender>{children}</this.ModalRender>;
    }
    return <this.BlurRender>{children}</this.BlurRender>;
  }
}

AppModal.defaultProps = {};
export default AppModal;
