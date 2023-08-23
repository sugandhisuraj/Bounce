import React from 'react';
import {Linking, Text, View, Platform} from 'react-native';

import {Buttons, Scaffold} from '../../components';
import {BounceNewLogoSvg} from '@svg';
import Styles from './indexCss';
import {getHp, getWp} from '../../app/utils';
import {APP_CONFIGURATIONS} from '../../app/constants';

const appUploadLink = Platform.select({
  ios: APP_CONFIGURATIONS.IOS_APP_LINK,
  android: APP_CONFIGURATIONS.ANDROID_APP_LINK,
});
const UpdateAppScreen = () => {
  const onPressUpdateApp = () => {
    Linking.canOpenURL(appUploadLink).then(supported => {
      supported && Linking.openURL(appUploadLink);
    },() =>  console.log());
  };
  return (
    <Scaffold
      contentContainerStyle={{backgroundColor: '#FBFBFB'}}
      statusBarStyle={{backgroundColor: '#FBFBFB'}}>
      <View style={[Styles.container]}>
        <BounceNewLogoSvg
          preserveAspectRatio="none"
          height={getHp(200)}
          width={getWp(400)}
        />
      </View>
      <Text style={Styles.versionExpiredText}>This Version Has Expired</Text>
      <Buttons.PrimaryButton
        onPress={onPressUpdateApp}
        withShadow={false}
        titleStyle={[Styles.updateBounceTitleStyle]}
        containerStyle={Styles.updateBounceContainerStyle}
        title={'Update Bounce'}
      />
    </Scaffold>
  );
};
export default UpdateAppScreen;
