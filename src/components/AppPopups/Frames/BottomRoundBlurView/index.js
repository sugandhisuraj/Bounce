import React, {Component} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {Buttons} from '../../..';
import BlurView from '../../../BlurView';
import Styles from './indexCss';

class CenterRoundBlurView extends Component {
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
  RenderModalData = () => {
    const {props} = this;
    const {bottomViewContainerStyle, containerStyle, onClosePress} = props;
    return (
      <View style={[Styles.container, containerStyle]}>
        <View style={[Styles.centerViewContainer, bottomViewContainerStyle]}>
          {props.children}
        </View>
        <Buttons.CircularRoundClose
          onClosePress={onClosePress}
          containerStyle={[Styles.closeButtonContainerStyle]}
        />
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

CenterRoundBlurView.defaultProps = {
  bottomViewContainerStyle: {},
  onClosePress: null,
};
export default CenterRoundBlurView;
