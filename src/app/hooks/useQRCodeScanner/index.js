import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {CloseGreyCircularSvg} from '@svg';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

import Styles from './indexCss';
import {getHp, getWp} from '../../utils';

const useQRCodeScanner = props => {
  const [scanMode, setScanMode] = useState(props.scanMode);

  const QRCodeComponent = props => {
    const {onCancelPress,onReadQr} = props;
    if (!scanMode) {
      return null;
    }
    return (
      <View style={{flex: 1}}>
        <QRCodeScanner
        vibrate={false}
          showMarker={true}
          cameraStyle={{height: '100%'}}
          onRead={onReadQr}
          flashMode={RNCamera.Constants.FlashMode.torch}
        />
        <TouchableOpacity
          onPress={() => {
            setScanMode(false);
            onCancelPress();
          }}
          style={Styles.closeContainer}>
          <CloseGreyCircularSvg height={getHp(50)} width={getHp(50)} />
        </TouchableOpacity>
      </View>
    );
  };

  return [QRCodeComponent, scanMode, setScanMode];
};

export default useQRCodeScanner;
