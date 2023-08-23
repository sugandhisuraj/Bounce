import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {observer} from 'mobx-react';
import {wait} from '../../../app/utils'; 
import {SplashMp4} from '../../../components'; 
import {AuthService} from '../../../app/services';
import UpdateAppScreen from '../../UpdateAppScreen';

const SplashScreen = props => {
  const [isAppNeedsUpdate, setIsAppNeedsUpdate] = useState(false);
  useEffect(() => {
    appVersionCheck();
  }, []);
  const appVersionCheck = async () => {
    try {
      await wait(3000);
      const isAppNeedsToBeUpdate = await AuthService.isAppNeedsToBeUpdate();
      if (isAppNeedsToBeUpdate) {
        setIsAppNeedsUpdate(i => !i);
        return;
      }
      AuthService.autoLogin();
    } catch (error) {
      AuthService.autoLogin();
    }
  };
  if (isAppNeedsUpdate) {
    return <UpdateAppScreen />;
  }
  return <SplashMp4 />;
  return (
    <View style={styles.container}>
      {/* <BounceSplash preserveAspectRatio='none' height={170} width={238} /> */}
      <SplashMp4 />
    </View>
  );
};
SplashScreen.routeName = '/SplashScreen';

export default observer(SplashScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
