import React from 'react';
import {View, Text} from 'react-native';
import {observer} from 'mobx-react';
import QRCode from 'react-native-qrcode-svg';

import Styles from './indexCss';
import MobxStore from '../../mobx';
import {getHp} from '../../app/utils';

const UserQRComponent = props => {
  const {authStore} = MobxStore;
  const userinfo = authStore.user.user;
  const {containerStyle} = props; 
  let qrValue = userinfo.QrValue ?? userinfo.id + '@' + userinfo.email;
  return (
    <View style={[Styles.container, Styles.shadowStyle, containerStyle]}>
      <QRCode
        value={qrValue}
        logo={{uri: userinfo.profileImage.filePath}}
        logoBorderRadius={100}
        logoSize={50}
        color="#04A9FF"
        logoBackgroundColor="transparent"
        size={getHp(210)}
      />
    </View>
  );
};
UserQRComponent.defaultProps = {
  containerStyle: {},
};

export default observer(UserQRComponent);
