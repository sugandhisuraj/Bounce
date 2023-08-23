import React from 'react';
import {TouchableOpacity, Image, Text} from 'react-native';

import {Placeholder} from '@assets';
import Styles from './indexCss';

const SpotifyFavoriteMusic = props => {
  const {track, onPress, trackImageStyle, trackNameStyle, trackContainerStyle} =
    props;

  let sourceImg = Placeholder;
  if (track.image) {
    sourceImg = {uri: track.image};
  }
  let trackNameText =
    (track.name.length > 32 ? track.name.substr(0, 32) + '...' : track.name) ??
    track.name;
  return (
    <TouchableOpacity
      style={[Styles.trackContainer, trackContainerStyle]}
      disabled={!onPress}
      onPress={onPress}>
      <Image source={sourceImg} style={[Styles.trackImage, trackImageStyle]} />
      <Text style={[Styles.trackName, trackNameStyle]}>{trackNameText}</Text>
    </TouchableOpacity>
  );
};

SpotifyFavoriteMusic.defaultProps = {
  track: {},
  onPress: null,
  trackNameStyle: {},
  trackContainerStyle: {},
  trackImageStyle: {},
};

export default SpotifyFavoriteMusic;
