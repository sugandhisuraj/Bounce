import React from 'react';
import {View, StyleSheet} from 'react-native';
import Video from 'react-native-video';
import Scaffold from '../Scaffold';

const SplashMp4 = () => {
  return (
    <Scaffold>
      <View style={styles.container}>
        <Video
          style={styles.videoStyle}
          source={require('../../assets/SplashScreen.mp4')}
          controls={false}
          playInBackground={true}
          resizeMode={'contain'}
          fullscreenOrientation={'portrait'}
        />
      </View>
    </Scaffold>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: 'red',
    flex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    width: '100%',
  },
  videoStyle: {
    height: '100%',
    width: '100%',
  },
});
export default SplashMp4;
