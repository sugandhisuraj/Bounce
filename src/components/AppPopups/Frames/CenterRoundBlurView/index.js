import React, {Component, memo, PureComponent} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';

import {Buttons} from '../../..';
import BlurView from '../../../BlurView';
import Styles from './indexCss';

class CenterRoundBlurView extends PureComponent {
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
    const {centerViewContainerStyle, onClosePress} = props;
    return (
      <View style={[Styles.container]}>
        <View />
        <View style={[Styles.centerViewContainer, centerViewContainerStyle]}>
          {props.children}
        </View>
        {props?.showClose ? (
          <Buttons.CircularRoundClose
            onClosePress={onClosePress}
            containerStyle={[Styles.closeButtonContainerStyle]}
          />
        ) : (
          <View />
        )}
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
  centerViewContainerStyle: {},
  onClosePress: null,
};
export default CenterRoundBlurView;
